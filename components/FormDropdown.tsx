"use client";

import { Combobox, Transition } from "@headlessui/react";
import { useState, Fragment } from "react";
import Image from "next/image";

interface FormDropdownProps {
  selectedValue: string;
  setSelectedValue: (selectedValue: string) => void;
  name: string;
  register: any;
  placeholderName?: string;
  dropdownValues: string[];
}

const FormDropdown = ({
  selectedValue,
  setSelectedValue,
  name,
  register,
  placeholderName,
  dropdownValues,
}: FormDropdownProps) => {
  const [query, setQuery] = useState("");

  const filterDropdown =
    query === ""
      ? dropdownValues
      : dropdownValues.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, "")),
        );
  return (
    <div className="flex w-full flex-col gap-2 md:w-1/2">
      <label className="text-sm font-semibold text-primary-gray-900 dark:text-white">
        {placeholderName}
      </label>
      <Combobox value={selectedValue} onChange={setSelectedValue}>
        <div className="relative md:w-[95%]">
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
            className="h-11 w-full cursor-pointer rounded-md bg-light-white-200 p-4 pl-3 text-xs text-black outline-none dark:bg-primary-gray-800 dark:text-white"
            displayValue={(item: string) => item}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Select ${placeholderName}`}
            name={name}
            {...register(name)}
          />
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options
              className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg focus:outline-none dark:bg-primary-gray-800"
              static
            >
              {filterDropdown.length === 0 && query !== "" ? (
                <Combobox.Option
                  value={query}
                  className="cursor-default select-none py-2 pl-2 text-xs"
                >
                  No results found
                </Combobox.Option>
              ) : (
                filterDropdown.map((item) => (
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

export default FormDropdown;
