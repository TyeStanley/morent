import React from "react";
import Image from "next/image";
import { ButtonProps } from "@/types";
import Spinner from "./Spinner";

const Button = ({
  title,
  bgColor,
  borderColor,
  leftIcon,
  textColor,
  extraStyles,
  btnType,
  disabled,
  isLoading,
  handleClick,
}: ButtonProps) => {
  return (
    <button
      type={btnType || "button"}
      onClick={handleClick}
      className={`flex h-[40px] w-full cursor-pointer items-center justify-center gap-1 rounded px-5 py-3 text-xs hover:bg-primary-blue-300 ${bgColor} ${borderColor} ${textColor} ${extraStyles} sm:w-auto sm:text-base`}
      disabled={disabled}
    >
      {leftIcon && (
        <div className="relative h-4 w-4">
          <Image
            src={leftIcon}
            alt="icon"
            fill
            className="rounded-full object-contain"
          />
        </div>
      )}
      {isLoading && <Spinner />}
      {title}
    </button>
  );
};

export default Button;
