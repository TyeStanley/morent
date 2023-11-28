"use client";

import Image from "next/image";
import MagGlass from "@/public/iconography/magnifying-glass-dark.svg";
import { SearchFilterProps } from "@/types";

export default function SearchFilter({
  isOpen,
  setIsOpen,
  inputData,
  handleInputData,
}: SearchFilterProps) {
  return (
    <section className="flex items-center justify-center gap-4 bg-white px-5 py-2 pb-5 dark:bg-primary-gray-900 md:w-full">
      <article className="flex flex-col md:w-full">
        <h2 className="my-4 hidden text-xs font-medium tracking-widest text-primary-blue-100 md:block">
          SEARCH
        </h2>
        {/* Input wrapper */}
        <label
          htmlFor="search-input"
          className="flex w-full items-center justify-start gap-2 rounded-lg border border-primary-blue-50 bg-white p-3 dark:border-primary-gray-800 dark:bg-primary-gray-850 md:p-2"
        >
          <MagGlass className="h-[24px] w-[24px]" />
          <input
            id="search-input"
            type="text"
            placeholder="Search cars here"
            className="border-none bg-transparent text-sm text-primary-gray-700 outline-none md:text-xs"
            value={inputData}
            onChange={handleInputData}
          />
        </label>
      </article>

      {/* Filter Button to open up modal */}
      <button
        className={`cursor-pointer rounded-lg border bg-white p-3 dark:bg-primary-gray-900 md:hidden ${
          isOpen
            ? "border-primary-blue-500"
            : "border-primary-blue-50/40 dark:border-primary-gray-800"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image
          src="/iconography/filter.svg"
          alt="Filter"
          width={24}
          height={24}
        />
      </button>
    </section>
  );
}
