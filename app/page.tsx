"use client";

import {
  AdCard,
  PickDropCard,
  CarCard,
  Button,
  PopularCarCard,
} from "@/components";
import Loader from "@/components/Loader";
import {
  carSearch,
  fetchAllCars,
  fetchPopularCars,
  totalCarCount,
} from "@/lib/actions/car.actions";
import { CarCardProps } from "@/types";
import { FormEvent, useEffect, useState } from "react";

export default function Home() {
  // PickDropCard states
  const [location, setLocation] = useState("");
  const [availabilityFrom, setAvailabilityFrom] = useState("");
  const [availabilityTo, setAvailabilityTo] = useState("");

  // Storing data
  const [cars, setCars] = useState<CarCardProps[]>([]);
  const [popularCars, setPopularCars] = useState<CarCardProps[]>([]);

  // Show more cars functionality
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // hide popular cars
  const [hidePopularCars, setHidePopularCars] = useState(false);

  // Loading
  const [isLoading, setIsLoading] = useState(true);
  const [isShowMoreLoading, setIsShowMoreLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        // Fetch the total count of cars and store it in totalCount
        const count = await totalCarCount();
        setTotalCount(count);

        // Fetch regular and popular cars
        const regularData = await fetchAllCars(currentPage, 8);
        const popularData = await fetchPopularCars();

        // Combine the new data with the existing data
        setCars((prevCars) => [...prevCars, ...regularData]);
        setPopularCars(popularData);
        setIsLoading(false);
        setIsShowMoreLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, [currentPage]);

  // Sends data to the backend
  const fetchFilteredCars = async () => {
    try {
      // Fetch filtered cars based on search criteria
      const result = await carSearch({
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
    setHidePopularCars(true);
  };

  // show more cars
  const handleLoadMoreClick = () => {
    setCurrentPage((currentPage) => currentPage + 1);
    setIsShowMoreLoading(true);
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-[1400px] flex-col items-center px-6 py-3 xl:px-16 xl:py-8">
      <div className="flex w-full justify-center gap-4 md:justify-between">
        <AdCard
          title="The Best Platform for Car Rental"
          subtitle="Ease of doing a car rental safely and reliably. Of course at a low price."
          backgroundImage="bg-[url('/ad-background1.svg')]"
          carImage="/ad-car-left.png"
        />
        <AdCard
          title="Easy way to rent a car at a low price"
          subtitle="Providing cheap car rental services and safe and comfortable facilities."
          backgroundImage="bg-[url('/ad-background2.svg')]"
          carImage="/ad-car-right.png"
          additionalStyles="hidden md:flex"
        />
      </div>

      <PickDropCard
        location={location}
        setLocation={setLocation}
        availabilityFrom={availabilityFrom}
        setAvailabilityFrom={setAvailabilityFrom}
        availabilityTo={availabilityTo}
        setAvailabilityTo={setAvailabilityTo}
        handleSubmit={handleSubmit}
      />

      {isLoading ? (
        <div className="mt-5 flex h-screen items-start justify-center md:mt-28">
          <Loader />
        </div>
      ) : (
        <>
          {!hidePopularCars && (
            <section className="relative mt-6 flex w-full flex-col">
              <h2 className="mb-8 text-sm font-semibold text-primary-gray-400">
                Popular Cars
              </h2>
              <div className="relative">
                <div className="relative flex w-full items-center gap-4 overflow-x-auto md:flex-row md:justify-between md:overflow-x-scroll xl:overflow-x-hidden xl:to-0%">
                  {popularCars.map((car) => (
                    <PopularCarCard
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
                      description={car.description}
                      isRented={car.isRented}
                    />
                  ))}
                </div>
                <div className="absolute inset-y-0 right-0 shadow-customShadow dark:shadow-customShadowDark xl:hidden"></div>
              </div>
            </section>
          )}

          {/* Recommended Cars Section */}
          <section className="mt-6 flex w-full flex-col">
            <h2 className="mb-8 text-sm font-semibold text-primary-gray-400">
              Recommended Cars
            </h2>

            {cars.length > 0 ? (
              <div className="grid w-full grid-cols-1 items-center justify-center gap-5 smd:grid-cols-2 mdl:grid-cols-3 xl:grid-cols-4">
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
                    description={car.description}
                    isRented={car.isRented}
                  />
                ))}
              </div>
            ) : (
              <section className="animate-pulse text-center dark:text-white">
                WARNING: No cars available in {location}. Please try another
                location.
              </section>
            )}

            {cars.length < totalCount - 4 && (
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
          </section>
        </>
      )}
    </main>
  );
}
