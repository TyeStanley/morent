"use client";

import Button from "./Button";
import Image from "next/image";
import SearchLocation from "./SearchLocation";
import { usePathname } from "next/navigation";
import { PickDropCardProps } from "@/types";
import AvailabilityInput from "@/components/AvailabilityInput";

const PickDropCard = ({
  location,
  setLocation,
  availabilityFrom,
  setAvailabilityFrom,
  availabilityTo,
  setAvailabilityTo,
  handleSubmit,
}: PickDropCardProps) => {
  const pathname = usePathname();

  return (
    <>
      <section className="flex w-full flex-col gap-2 rounded-xl bg-white p-4 dark:bg-primary-gray-850 lg:flex-row">
        {/* Location */}
        <article className="flex w-full flex-col gap-2">
          <section className="flex gap-1">
            <Image
              src={"iconography/pickup.svg"}
              alt="pickup"
              height={14}
              width={14}
            />

            <h2 className="text-sm font-semibold text-primary-gray-900 dark:text-white xl:text-base">
              Location
            </h2>
          </section>

          <SearchLocation location={location} setLocation={setLocation} />
        </article>

        <AvailabilityInput
          text="Availability from"
          availability={availabilityFrom}
          setAvailability={setAvailabilityFrom}
        />

        <AvailabilityInput
          text="Availability to"
          availability={availabilityTo}
          setAvailability={setAvailabilityTo}
        />

        {/* Inside Buttons */}
        {pathname === "/" && (
          <Button
            bgColor="bg-primary-blue-500"
            textColor="text-white"
            title="Search"
            leftIcon="/iconography/magnifying-glass.svg"
            btnType="submit"
            extraStyles="hidden lg:flex mt-auto"
            handleClick={handleSubmit}
          />
        )}

        {pathname === "/search" && (
          <button
            className="relative mt-auto hidden items-center justify-center rounded-lg bg-primary-blue-500 p-5 lg:flex"
            onClick={handleSubmit}
          >
            <Image
              src="/iconography/magnifying-glass.svg"
              alt="magnifying glass"
              width={14}
              height={14}
              className="absolute"
            />
          </button>
        )}
      </section>

      {/* Outside Buttons */}
      {pathname === "/" && (
        <Button
          bgColor="bg-primary-blue-500"
          textColor="text-white"
          title="Search"
          leftIcon="/iconography/magnifying-glass.svg"
          btnType="submit"
          extraStyles="lg:hidden rounded-lg mt-4 sm:w-full"
          handleClick={handleSubmit}
        />
      )}

      {pathname === "/search" && (
        <Button
          bgColor="bg-primary-blue-500"
          textColor="text-white"
          title="Search"
          leftIcon="/iconography/magnifying-glass.svg"
          btnType="submit"
          extraStyles="lg:hidden rounded-lg"
          handleClick={handleSubmit}
        />
      )}
    </>
  );
};

export default PickDropCard;
