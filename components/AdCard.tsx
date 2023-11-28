import { AdCardProps } from "@/types";
import Image from "next/image";

const AdCard = ({
  title,
  subtitle,
  backgroundImage,
  carImage,
  additionalStyles,
}: AdCardProps) => {
  return (
    <main
      className={`mb-8 flex h-64 w-full min-w-[300px] rounded-xl bg-cover bg-center object-contain px-4 pb-1 pt-4 md:h-[360px] md:w-[400px] md:bg-auto lg:w-[525px] xl:w-[640px] ${backgroundImage} ${additionalStyles}`}
    >
      <div className="flex w-full flex-col justify-between">
        <section className="flex flex-col gap-2 md:max-w-[272px] xl:max-w-sm">
          <h1 className="max-w-[250px] text-base font-semibold leading-10 text-white sm:text-lg md:text-2xl lg:max-w-[272px] lg:text-3xl xl:max-w-xs xl:text-4xl">
            {title}
          </h1>
          <h2 className="max-w-[230px] text-xs font-medium leading-5 text-white md:max-w-[272px] md:text-base">
            {subtitle}
          </h2>
        </section>
        <div className="flex w-full items-center justify-center">
          {carImage === "/ad-car-left.png" ? (
            <div className="relative h-[80px] w-[300px] shrink md:h-[116px] md:w-[406px]">
              <Image src={`${carImage}`} alt="car" fill />
            </div>
          ) : (
            <div className="relative bottom-[5px] h-[108px] w-[340px]">
              <Image src={`${carImage}`} alt="car" fill />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdCard;
