"use client";

import { searchFilters } from "@/constants";
import Cross from "@/public/iconography/cross.svg";
import Image from "next/image";
import { SearchFilterModalProps } from "@/types";

export default function SearchFilterModal({
  isOpen,
  setIsOpen,
  onHandleChange,
  checked,
  sliderValue,
  handleSliderChange,
}: SearchFilterModalProps) {
  return (
    <>
      {isOpen && (
        <div className="absolute inset-x-0 bottom-0 top-[150px] md:hidden">
          <div
            className="fixed inset-x-0 bottom-0 top-[150px] bg-primary-gray-400/40 dark:bg-primary-gray-900/40"
            onClick={() => setIsOpen(false)}
          />

          <section className="relative z-20 mx-2 mt-[15px] rounded-lg bg-white p-5 dark:bg-primary-gray-850">
            <article className="flex items-center justify-between">
              <h2 className="text-xs font-medium tracking-widest text-primary-blue-100">
                TYPE
              </h2>
              <Cross
                className="h-[24px] w-[24px] dark:fill-light-white-200"
                onClick={() => setIsOpen(false)}
              />
            </article>

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
            <article className="mt-3 flex flex-col justify-center gap-2">
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
        </div>
      )}
    </>
  );
}
