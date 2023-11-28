"use client";

import Image from "next/image";
import Button from "./Button";
import { CarCardProps, ModalDataProps } from "@/types";
import CarDetailsModal from "./CarDetailsModal";
import { useState, useEffect } from "react";
import { likeCar, unlikeCar } from "@/lib/actions/car.actions";
import { useUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

const PopularCarCard = ({
  id,
  title,
  type,
  images,
  fuel,
  transmission,
  people,
  price,
  priceBeforeDiscount,
  description,
  isRented,
}: CarCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  // Like car functionality
  const [likedCarIds, setLikedCarIds] = useState<string[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [allowDBUpdate, setAllowDBUpdate] = useState(true);

  const { user } = useUser();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const mongoUser = await fetchUser(user?.id);

        setLikedCarIds(mongoUser.likedCars || []);
        setIsLiked(mongoUser.likedCars && mongoUser.likedCars.includes(id));
      } catch (error: any) {
        console.log(error);
      }
    }

    fetchUserData();
  }, [id, user?.id]);

  const handleLikeClick = async (id: string) => {
    if (!user) router.push("/sign-in");
    if (!likedCarIds.includes(id)) {
      // Add the car ID to the likedCarIds
      setLikedCarIds([...likedCarIds, id]);
      setIsLiked(true);

      if (allowDBUpdate) {
        // Prevent further DB updates for 1 second
        setAllowDBUpdate(false);

        try {
          await likeCar(id);

          setTimeout(() => {
            setAllowDBUpdate(true);
          }, 1000);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  const handleUnlikeClick = (id: string) => {
    if (likedCarIds.includes(id)) {
      // Remove the car ID from the likedCarIds
      const updatedLikedCarIds = likedCarIds.filter((carId) => carId !== id);
      setLikedCarIds(updatedLikedCarIds);
      setIsLiked(false);

      if (allowDBUpdate) {
        // Prevent further DB updates for 1 second
        setAllowDBUpdate(false);

        setTimeout(() => {
          unlikeCar(id);
          setAllowDBUpdate(true);
        }, 1000);
      }
    }
  };

  const [modalData, setModalData] = useState<ModalDataProps>({
    id: "",
    carNameData: "null",
    carTypeData: "null",
    images: [],
    gasData: 1,
    transmissionData: "null",
    passengerCountData: "",
    priceData: 1,
    priceBeforeDiscountData: "null",
    descriptionData: "",
    isRented: false,
  });

  const handleClick = (e: any) => {
    e.preventDefault();
    setModalData({
      id,
      carNameData: title,
      carTypeData: type,
      images,
      gasData: fuel,
      transmissionData: transmission,
      passengerCountData: people,
      priceData: price,
      priceBeforeDiscountData: priceBeforeDiscount,
      descriptionData: description,
      isRented,
    });

    setIsOpen(true);
  };

  return (
    <>
      <article className="flex max-h-72 w-60 min-w-[240px] max-w-xs flex-col rounded-lg bg-white p-4 dark:bg-primary-gray-850 sm:h-96 sm:min-h-[360px] sm:w-[306px] sm:min-w-[306px]">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-base font-semibold text-primary-gray-900 dark:text-white sm:text-xl sm:font-bold">
            {title}
          </h2>
          {isLiked ? (
            <button
              className="relative h-4 w-4 focus:animate-heartJump sm:h-6 sm:w-6"
              onClick={() => id && handleUnlikeClick(id)}
            >
              <Image
                src="iconography/red-heart.svg"
                alt="liked heart"
                fill
                className="cursor-pointer"
              />
            </button>
          ) : (
            <button
              className="relative h-4 w-4 sm:h-6 sm:w-6"
              onClick={() => id && handleLikeClick(id)}
            >
              <Image
                src="iconography/heart.svg"
                alt="unliked heart"
                fill
                className="cursor-pointer"
              />
            </button>
          )}
        </div>
        <h3 className="text-xs font-medium text-primary-gray-400 sm:text-sm sm:font-bold">
          {type}
        </h3>
        <section className="flex flex-col gap-y-4 pb-5">
          <div className="w-full pl-7 sm:pl-3">
            <div className="relative h-20 w-36 sm:h-36 sm:w-60">
              <Image
                src={images[0]}
                alt="car"
                fill
                className="h-full w-full object-contain object-bottom"
              />
            </div>
          </div>
          <div className="flex w-full flex-row pt-3">
            <div className="inline-flex w-full items-center">
              <div className="relative h-[14px] w-[14px] sm:h-6 sm:w-6">
                <Image src="iconography/gas-station.svg" alt="gas pump" fill />
              </div>
              <span className="pl-1 text-xs font-medium text-primary-gray-400 sm:text-sm">
                {fuel}L
              </span>
            </div>
            <div className="inline-flex w-full items-center sm:-ml-6">
              <div className="relative h-[14px] w-[14px] sm:h-6 sm:w-6">
                <Image
                  src="iconography/steering-wheel.svg"
                  alt="steering wheel"
                  fill
                />
              </div>
              <span className="pl-1 text-xs font-medium text-primary-gray-400 sm:text-sm">
                {transmission}
              </span>
            </div>
            <div className="inline-flex w-full items-center sm:ml-2">
              <div className="relative h-[14px] w-[14px] sm:h-6 sm:w-6">
                <Image
                  src="iconography/profile-2user.svg"
                  alt="profile users"
                  fill
                />
              </div>
              <span className="pl-1 text-xs font-medium text-primary-gray-400 sm:text-sm">
                {people} People
              </span>
            </div>
          </div>
        </section>
        <div className="flex flex-row items-center justify-between gap-6 pt-5 sm:gap-7">
          <div className="flex flex-col sm:w-full">
            <h2 className="text-base font-semibold text-primary-gray-900 dark:text-white sm:text-xl sm:font-bold">
              ${price}/
              <span className="text-xs font-medium text-primary-gray-400 sm:text-sm sm:font-bold">
                day
              </span>
            </h2>
            {priceBeforeDiscount && (
              <h3 className="text-xs font-medium text-primary-gray-400 line-through sm:text-sm sm:font-bold">
                ${priceBeforeDiscount}
              </h3>
            )}
          </div>
          <Button
            bgColor="bg-primary-blue-500"
            textColor="text-white"
            title="More info"
            extraStyles="sm:w-full"
            handleClick={handleClick}
          />
        </div>
      </article>
      {isOpen && <CarDetailsModal setIsOpen={setIsOpen} data={modalData} />}
    </>
  );
};

export default PopularCarCard;
