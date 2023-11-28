import Image from "next/image";

const Spinner = () => {
  return (
    <div className="animate-spin text-white">
      <div className="relative h-5 w-5">
        <Image src="iconography/loading-wheel.svg" alt="steering wheel" fill />
      </div>
    </div>
  );
};

export default Spinner;
