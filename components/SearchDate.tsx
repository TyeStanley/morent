"use client";

import { ChangeEvent } from "react";
import { SearchDateProps } from "@/types";

const SearchDate = ({ availability, setAvailability }: SearchDateProps) => {
  const todayDate = new Date();

  return (
    <article className="flex w-full items-center justify-center">
      <input
        type="date"
        className="h-10 w-full cursor-pointer rounded-md bg-light-white-200 p-4 pl-2 text-xxs text-primary-gray-400 outline-none dark:bg-primary-gray-800 dark:text-light-white-200 xl:text-sm"
        placeholder="MM-DD-YYYY"
        min={todayDate.toISOString().split("T")[0]}
        value={availability}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setAvailability(e.target.value)
        }
      />
    </article>
  );
};

export default SearchDate;
