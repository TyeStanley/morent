import SearchDate from "@/components/SearchDate";
import Image from "next/image";
import { AvailabilityInputProps } from "@/types";

export default function AvailabilityInput({
  text,
  availability,
  setAvailability,
}: AvailabilityInputProps) {
  return (
    <article className="flex w-full justify-between gap-2">
      <section className="flex w-full flex-col gap-2">
        <article className="flex gap-1">
          <Image
            src="/iconography/calendar.svg"
            alt="calendar"
            height={14}
            width={14}
          />

          <h2 className="text-sm font-semibold text-primary-gray-900 dark:text-white xl:text-base">
            {text}
          </h2>
        </article>

        <SearchDate
          availability={availability}
          setAvailability={setAvailability}
        />
      </section>
    </article>
  );
}
