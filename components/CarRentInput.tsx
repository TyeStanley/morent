import { CarRentInputProps } from "@/types";

const CarRentInput = ({
  label,
  placeholder,
  name,
  register,
}: CarRentInputProps) => {
  return (
    <section className="flex w-full flex-col gap-2 md:w-1/2">
      <label className="text-sm font-semibold text-primary-gray-900 dark:text-white">
        {label}
      </label>
      <input
        className="h-11 w-full rounded-md bg-light-white-200 pl-3 text-xs text-primary-gray-900 dark:bg-primary-gray-800 dark:text-white md:w-[95%]"
        type="text"
        placeholder={placeholder}
        name={name}
        {...register(name)}
      />
    </section>
  );
};

export default CarRentInput;
