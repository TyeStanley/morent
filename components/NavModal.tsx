// Headless UI
import { Dialog } from "@headlessui/react";

// React
import { useState, useEffect } from "react";

// Next
import Link from "next/link";
import Image from "next/image";

// SVGR Icons
import HomeIcon from "@/public/nav-icons/home-icon.svg";
import SearchIcon from "@/public/nav-icons/search-icon.svg";
import PlusIcon from "@/public/nav-icons/plus-icon.svg";
import CloseX from "@/public/nav-icons/close.svg";

// Components
import Button from "@/components/Button";

// Clerk
import { SignedOut, SignedIn } from "@clerk/clerk-react";

// Next
import { usePathname } from "next/navigation";

// Types
import { NavModalProps } from "@/types";
import { SignOutButton } from "@clerk/nextjs";

// Server Actions
import { fetchUserImage } from "@/lib/actions/user.actions";

const NavModal = ({ isNavOpen, setIsNavOpen }: NavModalProps) => {
  // gets the current url route
  const pathname = usePathname();

  const [image, setImage] = useState("");

  useEffect(() => {
    const getImage = async () => {
      const imageUrl = await fetchUserImage();

      setImage(imageUrl);
    };

    getImage();
  });

  return (
    <Dialog
      open={isNavOpen}
      onClose={() => setIsNavOpen(false)}
      className="absolute inset-0"
    >
      {/* Gives the darker overlay bg */}
      <Dialog.Overlay
        className="fixed inset-0 bg-black/30"
        aria-hidden="true"
      />

      {/* Modal Body */}
      <section className="relative z-50 mx-2.5 mt-5 rounded-lg bg-white p-5 dark:bg-primary-gray-850">
        {/* Modal Header */}
        <article className="flex items-center justify-between">
          <h1 className="cursor-pointer text-2xl font-bold text-primary-blue-500">
            MORENT
          </h1>

          <CloseX
            className="h-[24px] w-[24px] cursor-pointer fill-primary-gray-700 dark:fill-primary-blue-50"
            onClick={() => setIsNavOpen(false)}
          />
        </article>

        {/* Nav Links */}
        <article className="mt-10 flex flex-col gap-2">
          <Link
            href="/"
            className={`flex w-full items-center gap-1.5 rounded ${
              pathname === "/"
                ? "bg-primary-blue-500 text-white"
                : "text-primary-gray-700 dark:text-white"
            } p-2 text-sm outline-none`}
            onClick={() => setIsNavOpen(false)}
          >
            <HomeIcon
              className={`${
                pathname === "/"
                  ? "fill-white"
                  : "fill-primary-gray-700 dark:fill-white"
              }`}
            />{" "}
            Home
          </Link>

          <Link
            href="/search"
            className={`flex w-full items-center gap-1.5 rounded ${
              pathname === "/search"
                ? "bg-primary-blue-500 text-white"
                : "text-primary-gray-700 dark:text-white"
            } p-2 text-sm outline-none`}
            onClick={() => setIsNavOpen(false)}
          >
            <SearchIcon
              className={`${
                pathname === "/search"
                  ? "fill-white"
                  : "fill-primary-gray-700 dark:fill-white"
              }`}
            />{" "}
            Search
          </Link>

          <Link
            href="/cars/new"
            className={`flex w-full items-center gap-1.5 rounded ${
              pathname === "/cars/new"
                ? "bg-primary-blue-500 text-white"
                : "text-primary-gray-700 dark:text-white"
            } p-2 text-sm outline-none`}
            onClick={() => setIsNavOpen(false)}
          >
            <PlusIcon
              className={`${
                pathname === "/cars/new"
                  ? "fill-white"
                  : "fill-primary-gray-700 dark:fill-white"
              }`}
            />{" "}
            Add Car
          </Link>
        </article>

        {/* If SignedIn display My Profile Button and Logout Button */}
        <SignedIn>
          <section className="my-5 flex flex-col gap-2">
            <Link
              href="/profile"
              className={`flex h-[50px] w-full items-center justify-center gap-1.5 rounded border border-primary-blue-50 p-2 text-sm font-semibold outline-none ${
                pathname === "/profile"
                  ? "bg-primary-blue-500 text-white"
                  : "text-primary-blue-500 dark:border-none dark:bg-primary-gray-700 dark:text-primary-blue-300"
              }`}
              onClick={() => setIsNavOpen(false)}
            >
              <Image
                src={image}
                alt="user-icon"
                width={20}
                height={20}
                className="rounded-full"
              />
              <span className="relative bottom-[1px]">My Profile</span>
            </Link>

            <SignOutButton>
              <button
                className="flex h-[50px] items-center justify-center rounded border-primary-gray-700 bg-primary-red p-2 text-sm font-semibold text-white sm:w-full"
                onClick={() => setIsNavOpen(false)}
              >
                <span className="relative bottom-[1px]">Logout</span>
              </button>
            </SignOutButton>
          </section>
        </SignedIn>

        {/* If SignedOut display Login Button */}
        <SignedOut>
          <Link
            href="/sign-in"
            className="my-5 block"
            onClick={() => setIsNavOpen(false)}
          >
            <Button
              title="Login"
              bgColor="bg-white"
              borderColor="border border-primary-blue-50"
              textColor="text-primary-blue-500"
              extraStyles="font-semibold sm:w-full"
            />
          </Link>
        </SignedOut>
      </section>
    </Dialog>
  );
};

export default NavModal;
