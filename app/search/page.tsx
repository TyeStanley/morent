"use client";

import { Button, SearchFilter } from "@/components";
import { CarCardProps, Checked } from "@/types";
import { useState, ChangeEvent, useEffect, FormEvent } from "react";
import SearchFilterModal from "@/components/SearchFilterModal";
import { searchFilters } from "@/constants";
import Image from "next/image";
import PickDropCard from "@/components/PickDropCard";
import CarCard from "@/components/CarCard";
import {
  carSearch,
  fetchAllCars,
  totalCarCount,
} from "@/lib/actions/car.actions";
import Loader from "@/components/Loader";

export default function Search() {
  // controls if the modal is open or not
  const [isOpen, setIsOpen] = useState(false);

  // Handles the input data
  const [inputData, setInputData] = useState("");

  // For the check boxes state
  const [checked, setChecked] = useState<Checked>({});

  // For the slider state
  const [sliderValue, setSliderValue] = useState<number>(50);

  // PickDropCard states
  const [location, setLocation] = useState("");
  const [availabilityFrom, setAvailabilityFrom] = useState("");
  const [availabilityTo, setAvailabilityTo] = useState("");

  // Show more loading
  const [isLoading, setIsLoading] = useState(true);
  const [isShowMoreLoading, setIsShowMoreLoading] = useState(false);

  // Storing data
  const [cars, setCars] = useState<CarCardProps[]>([]);

  // Show more cars functionality
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Changes the slider value
  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(e.target.value));
  };

  // Manages the checked state of the checkboxes
  const onHandleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, checked } = e.target;

    setChecked((prevState) => ({ ...prevState, [id]: checked }));
  };

  // Sets the input data on change
  const handleInputData = (e: ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
  };

  // Sends data to the backend
  const fetchFilteredCars = async () => {
    try {
      // Fetch filtered cars based on search criteria
      const result = await carSearch({
        carName: inputData,
        carType: checked,
        maxPrice: sliderValue,
        location,
        availabilityFrom,
        availabilityTo,
      });

      // Update the cars state with the filtered results
      if (result) {
        setCars(result);

        // Reset currentPage and totalCount if needed
        setCurrentPage(1);
        setTotalCount(result.length);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    fetchFilteredCars();
  };

  useEffect(() => {
    const getData = async () => {
      try {
        // Fetch the total count of cars and store it in totalCount
        const count = await totalCarCount();
        setTotalCount(count);

        // Fetch regular cars
        const regularData = await fetchAllCars(currentPage, 6);

        // Combine the new data with the existing data
        setCars((prevCars) => [...prevCars, ...regularData]);
        setIsLoading(false);
        setIsShowMoreLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, [currentPage]);

  // show more cars
  const handleLoadMoreClick = () => {
    setCurrentPage((currentPage) => currentPage + 1);
    setIsShowMoreLoading(true);
  };

  return (
    <main className="flex flex-col dark:bg-off-gray md:flex-row 2xl:max-w-[1545px]">
      {/* Search sidebar with checkboxes */}
      <aside className="md:w-[250px] lg:w-[275px] xl:w-[360px]">
        <SearchFilter
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          inputData={inputData}
          handleInputData={handleInputData}
        />

        {/* Desktop CheckBoxes */}
        <section className="hidden h-full w-full bg-white px-5 pb-5 pt-0 dark:bg-primary-gray-900 md:block">
          <h2 className="text-xs font-medium tracking-widest text-primary-blue-100">
            TYPE
          </h2>

          {/* Type Filter Options */}
          <article className="mt-2 flex flex-col justify-center gap-2">
            {searchFilters.type.map((type) => (
              <label
                key={type}
                htmlFor={type}
                className="relative flex items-center justify-start gap-3"
              >
                {checked[type] ? (
                  <Image
                    src="/iconography/tick-square.svg"
                    alt="check"
                    width={18}
                    height={18}
                    className="absolute bottom-0 left-0"
                  />
                ) : (
                  <Image
                    src="/iconography/untick-square.svg"
                    alt="check"
                    width={18}
                    height={18}
                    className="absolute bottom-0 left-0"
                  />
                )}
                <input
                  id={type}
                  type="checkbox"
                  className="invisible"
                  onChange={onHandleChange}
                />
                <span className="text-xs text-primary-gray-700 dark:text-light-white-100">
                  {type}
                </span>
              </label>
            ))}
          </article>

          <h2 className="mt-5 text-xs font-medium tracking-widest text-primary-blue-100">
            CAPACITY
          </h2>
          {/* Capacity Filter Options */}
          <article className="mt-2 flex flex-col justify-center gap-2">
            {searchFilters.capacity.map((type) => (
              <label
                key={type}
                htmlFor={type}
                className="relative flex items-center justify-start gap-3"
              >
                {checked[type] ? (
                  <Image
                    src="/iconography/tick-square.svg"
                    alt="check"
                    width={18}
                    height={18}
                    className="absolute bottom-0 left-0"
                  />
                ) : (
                  <Image
                    src="/iconography/untick-square.svg"
                    alt="check"
                    width={18}
                    height={18}
                    className="absolute bottom-0 left-0"
                  />
                )}
                <input
                  id={type}
                  type="checkbox"
                  className="invisible"
                  onChange={onHandleChange}
                />
                <span className="text-xs text-primary-gray-700 dark:text-light-white-100">
                  {type}
                </span>
              </label>
            ))}
          </article>

          <h2 className="mt-5 text-xs font-medium tracking-widest text-primary-blue-100">
            PRICE
          </h2>
          {/* Price slider */}
          <article className="my-2">
            <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={handleSliderChange}
              className="h-2 w-full cursor-pointer rounded-lg"
            />
            <h3 className="mt-2 font-medium text-primary-gray-700 dark:text-light-white-100">
              ${sliderValue} / DAY
            </h3>
          </article>
        </section>
      </aside>

      {/* Main Content */}
      <section className="flex w-full flex-col gap-5 p-5">
        <PickDropCard
          location={location}
          setLocation={setLocation}
          availabilityFrom={availabilityFrom}
          setAvailabilityFrom={setAvailabilityFrom}
          availabilityTo={availabilityTo}
          setAvailabilityTo={setAvailabilityTo}
          handleSubmit={(e: FormEvent) => handleSubmit(e)}
        />

        {/* Car Card Section */}
        {isLoading ? (
          <div className="mt-5 flex h-screen items-start justify-center md:mt-20">
            <Loader />
          </div>
        ) : (
          <>
            {cars.length > 0 ? (
              <>
                <article className="grid w-full grid-cols-1 items-center justify-center gap-5 lg:grid-cols-2 lgx:grid-cols-3 2xl:grid-cols-4">
                  {cars.map((car) => (
                    <CarCard
                      key={car._id}
                      id={car._id}
                      title={car.title}
                      type={car.type}
                      images={car.images}
                      fuel={car.fuel}
                      transmission={car.transmission}
                      people={car.people}
                      price={car.price}
                      priceBeforeDiscount={car.priceBeforeDiscount}
                    />
                  ))}
                </article>

                {cars.length < totalCount - 5 && (
                  <div className="mb-5 mt-10 flex items-center justify-center">
                    <Button
                      bgColor="bg-primary-blue-500"
                      textColor="text-white"
                      title="Show more cars"
                      handleClick={handleLoadMoreClick}
                      isLoading={isShowMoreLoading}
                    />
                  </div>
                )}
              </>
            ) : (
              <section className="mt-5 animate-pulse text-center dark:text-white">
                WARNING: No cars matching your search criteria. Please try
                search again.
              </section>
            )}
          </>
        )}
      </section>

      <SearchFilterModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onHandleChange={onHandleChange}
        checked={checked}
        sliderValue={sliderValue}
        handleSliderChange={handleSliderChange}
      />
    </main>
  );
}
