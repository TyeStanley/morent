"use client";

import Cross from "@/public/iconography/cross.svg";
import Image from "next/image";
import Button from "./Button";
import { useState } from "react";
import { CarDetailsModalProps } from "@/types";
import { rentCar } from "@/lib/actions/car.actions";
import { useRouter } from "next/navigation";

const CarDetailsModal = ({ setIsOpen, data }: CarDetailsModalProps) => {
  const router = useRouter();
  const [activeImage, setActiveImage] = useState(0);

  const {
    id,
    carNameData,
    images,
    carTypeData,
    gasData,
    passengerCountData,
    priceBeforeDiscountData,
    priceData,
    transmissionData,
    descriptionData,
    isRented,
  } = data;

  async function handleSubmit(id: string | undefined) {
    await rentCar(id);

    router.push("/profile");
  }

  return (
    <>
      <div className="fixed inset-0 z-50 lg:inset-x-0">
        <div
          className="fixed inset-0 bg-gray-400/40 dark:bg-primary-gray-900/60"
          onClick={() => setIsOpen(false)}
        />
        <div className="relative top-[54px] mr-4 flex justify-end md:hidden">
          <Cross
            className="z-20 h-[24px] w-[24px] cursor-pointer rounded bg-white dark:bg-primary-gray-850"
            onClick={() => setIsOpen(false)}
          />
        </div>

        <section className="relative z-20 mx-auto mt-[50px] h-[688px] w-[97%] rounded-lg bg-white p-3 dark:bg-primary-gray-850 md:h-[520px] md:p-5 lg:mt-[150px] lg:w-4/5 xl:w-3/4">
          <article className="flex flex-col items-start justify-between gap-10 md:flex-row md:gap-4">
            <div className="flex w-full flex-col gap-y-4 sm:items-center md:w-1/2">
              {activeImage === 0 ? (
                <div className="h-56 w-full rounded-lg sm:w-4/5 md:h-[330px] md:w-full">
                  <div className="relative inset-y-1/3 m-auto h-20 w-48 sm:h-[250px] sm:w-auto md:inset-y-1/4">
                    <Image
                      src={images[activeImage]}
                      alt="car"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ) : (
                <div className="h-56 w-full rounded-lg sm:w-4/5 md:h-[330px] md:w-full">
                  <div className="relative m-auto h-52 w-52 sm:h-[200px] sm:w-[250px] md:h-[300px] md:w-[80%]">
                    <Image
                      src={images[activeImage]}
                      alt="car"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              )}
              <div className="flex w-full justify-between gap-3">
                <div className="h-16 w-24 cursor-pointer rounded-lg sm:h-24 sm:w-32 md:h-32 md:w-36">
                  <div className="relative m-auto h-16 w-20 sm:h-24 sm:w-32 md:h-32 md:w-28 lg:w-32">
                    <Image
                      src={images[0]}
                      alt="car"
                      onClick={() => setActiveImage(0)}
                      className="object-contain"
                      fill
                    />
                  </div>
                </div>
                <div className="h-16 w-24 cursor-pointer rounded-lg sm:h-24 sm:w-32 md:h-32 md:w-36">
                  <div className="relative m-auto h-16 w-20 sm:h-24 sm:w-32 md:h-32 md:w-28 lg:w-32">
                    <Image
                      src={images[1]}
                      alt="car"
                      fill
                      className="object-contain"
                      onClick={() => setActiveImage(1)}
                    />
                  </div>
                </div>
                <div className="h-16 w-24 cursor-pointer rounded-lg sm:h-24 sm:w-32 md:h-32 md:w-36">
                  <div className="relative m-auto h-16 w-20 sm:h-24 sm:w-32 md:h-32 md:w-28 lg:w-32">
                    <Image
                      src={images[2]}
                      alt="car"
                      fill
                      className="object-contain"
                      onClick={() => setActiveImage(2)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col md:w-1/2">
              <div className="flex w-full flex-col gap-y-4 md:h-[460px] md:justify-evenly md:gap-y-0">
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-bold leading-7 dark:text-white md:text-[32px] md:leading-10">
                    {carNameData}
                  </h1>
                  <div className="inline flex-col sm:hidden sm:w-full">
                    <h2 className="text-base font-semibold text-primary-gray-900 dark:text-white sm:text-2xl sm:font-bold">
                      ${priceData}/
                      <span className="text-xs font-medium text-primary-gray-400 sm:text-base sm:font-bold">
                        day
                      </span>
                    </h2>
                    {priceBeforeDiscountData && (
                      <h3 className="text-xs font-medium text-primary-gray-400 line-through sm:text-base sm:font-bold">
                        {priceBeforeDiscountData}
                      </h3>
                    )}
                  </div>
                  <Cross
                    className="hidden h-[24px] w-[24px] cursor-pointer md:inline"
                    onClick={() => setIsOpen(false)}
                  />
                </div>
                <p className="text-xs font-medium text-primary-gray-400 dark:text-light-white-200 md:text-sm">
                  0 Reviews
                </p>
                <p className="text-xs leading-6 text-primary-gray-700 dark:text-light-white-200 md:text-lg md:leading-10">
                  {descriptionData}
                </p>
                <div className="flex justify-between gap-11 md:flex-col md:gap-2 lg:flex-row lg:gap-8 xl:gap-16">
                  <div className="flex w-full justify-between">
                    <h2 className="text-xs font-normal text-primary-gray-400 md:text-lg">
                      Type Car
                    </h2>
                    <h2 className="text-xs font-semibold text-primary-gray-700 dark:text-light-white-200 md:text-lg">
                      {carTypeData}
                    </h2>
                  </div>
                  <div className="flex w-full justify-between">
                    <h2 className="text-xs font-normal text-primary-gray-400 md:text-lg">
                      Capacity
                    </h2>
                    <h2 className="text-xs font-semibold text-primary-gray-700 dark:text-light-white-200 md:text-lg">
                      {passengerCountData} People
                    </h2>
                  </div>
                </div>
                <div className="flex justify-between gap-11 md:flex-col md:gap-2 lg:flex-row lg:gap-8 xl:gap-16">
                  <div className="flex w-full justify-between">
                    <h2 className="text-xs font-normal text-primary-gray-400 md:text-lg">
                      Transm.
                    </h2>
                    <h2 className="text-xs font-semibold text-primary-gray-700 dark:text-light-white-200 md:text-lg">
                      {transmissionData}
                    </h2>
                  </div>
                  <div className="flex w-full justify-between">
                    <h2 className="text-xs font-normal text-primary-gray-400 md:text-lg">
                      Gasoline
                    </h2>
                    <h2 className="text-xs font-semibold text-primary-gray-700 dark:text-light-white-200 md:text-lg">
                      {gasData}L
                    </h2>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between gap-10 pt-5 lg:gap-12 xl:gap-20">
                  <div className="hidden flex-col sm:flex sm:w-full">
                    <h2 className="text-base font-semibold text-primary-gray-900 dark:text-white sm:text-2xl sm:font-bold">
                      ${priceData}/
                      <span className="text-xs font-medium text-primary-gray-400 sm:text-base sm:font-bold">
                        day
                      </span>
                    </h2>
                    {priceBeforeDiscountData && (
                      <h3 className="text-xs font-medium text-primary-gray-400 line-through sm:text-base sm:font-bold">
                        ${priceBeforeDiscountData}
                      </h3>
                    )}
                  </div>
                  <Button
                    bgColor={isRented ? "disabled-btn" : "bg-primary-blue-500"}
                    textColor="text-white"
                    title={isRented ? "Not Available" : "Rent Now"}
                    extraStyles="sm:w-full"
                    handleClick={() => handleSubmit(id)}
                    disabled={isRented}
                  />
                </div>
              </div>
            </div>
          </article>
        </section>
      </div>
    </>
  );
};

export default CarDetailsModal;
