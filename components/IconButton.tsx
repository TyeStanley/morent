import Image from "next/image";

const IconButton = () => {
  return (
    <button className="relative z-20 -my-3 flex h-16 w-16 items-center justify-center rounded-xl bg-primary-blue-500 md:-my-0">
      <div className="relative h-6 w-8">
        <Image
          src="/iconography/magnifying-glass.svg"
          alt="icon"
          fill
          className="rounded-full object-contain"
        />
      </div>
    </button>
  );
};

export default IconButton;
