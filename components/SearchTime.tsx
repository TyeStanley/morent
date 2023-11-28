"use client";

import { times } from "@/constants";
import { SearchTimeProps } from "@/types";
import { Combobox, Transition } from "@headlessui/react";
import { useState, Fragment } from "react";
import Image from "next/image";

const SearchTime = ({ time, setTime }: SearchTimeProps) => {
  const [query, setQuery] = useState("");

  const filteredTimes =
    query === ""
      ? times
      : times.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, "")),
        );
  return (
    <div className="flex w-full items-center justify-center">
      <Combobox value={time} onChange={setTime}>
        <div className="relative w-full">
          <Combobox.Button className="absolute top-4 w-full justify-end">
            <Image
              src="/iconography/arrow-down.svg"
              width={12}
              height={12}
              className="ml-auto mr-3"
              alt="arrow down"
            />
          </Combobox.Button>
          <Combobox.Input
            className="h-10 w-full cursor-pointer rounded-md bg-light-white-200 p-4 pl-2 text-xxs text-primary-gray-400 outline-none dark:bg-primary-gray-800 dark:text-white xl:text-sm"
            displayValue={(item: string) => item}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Select your time"
          />
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options
              className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg focus:outline-none dark:bg-primary-gray-800 dark:text-white sm:text-base"
              static
            >
              {filteredTimes.length === 0 && query !== "" ? (
                <Combobox.Option
                  value={query}
                  className="cursor-default select-none py-2 pl-2 text-xs"
                >
                  No times found
                </Combobox.Option>
              ) : (
                filteredTimes.map((item) => (
                  <Combobox.Option
                    key={item}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-3 pr-4 ${
                        active
                          ? "bg-primary-blue-300 text-white"
                          : "text-primary-gray-900 dark:text-white"
                      }`
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {item}
                        </span>

                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-primary-blue-300"
                            }`}
                          ></span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchTime;
