"use client";

// React Imports & Misc
import { useState } from "react";
import { UserButton, SignedOut, SignedIn } from "@clerk/clerk-react";

// Next
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// Components
import NavModal from "@/components/NavModal";
import Button from "@/components/Button";
import ThemeToggle from "@/components/ThemeToggle";

const Nav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState("");
  // gets the current url route
  const pathname = usePathname();

  return (
    <nav className="border-primary-blue-50/40 bg-white dark:border-primary-gray-850 dark:bg-primary-gray-900 md:border-b">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between p-5 xl:px-16">
        {/* left side of nav */}
        <Link href="/">
          <h1 className="cursor-pointer text-2xl font-bold text-primary-blue-500">
            MORENT
          </h1>
        </Link>

        {/* right side of nav */}
        <aside className="flex items-center gap-5">
          <section className="hidden font-semibold text-primary-gray-700 dark:text-light-white-200 md:flex md:gap-5">
            <Link
              href="/"
              className={`${
                pathname === "/" &&
                "text-primary-blue-500 dark:text-primary-blue-300"
              }`}
            >
              Home
            </Link>
            <Link
              href="/search"
              className={`${
                pathname === "/search" &&
                "text-primary-blue-500 dark:text-primary-blue-300"
              }`}
            >
              Search
            </Link>
            <Link
              href="/cars/new"
              className={`${
                pathname === "/cars/new" &&
                "text-primary-blue-500 dark:text-primary-blue-300"
              }`}
            >
              Add Car
            </Link>
            <SignedIn>
              <Link
                href="/profile"
                className={`${
                  pathname === "/profile" &&
                  "text-primary-blue-500 dark:text-primary-blue-300"
                }`}
              >
                My Profile
              </Link>
            </SignedIn>
          </section>

          <section className="flex gap-4">
            <SignedIn>
              <span className="hidden md:flex">
                <UserButton afterSignOutUrl="/" />
              </span>
            </SignedIn>

            <SignedOut>
              <Link href="/sign-in">
                <Button
                  title="Login"
                  bgColor="bg-primary-blue-500"
                  borderColor="border-primary-blue-500"
                  textColor="text-white"
                  extraStyles="font-semibold hidden md:flex"
                />
              </Link>
            </SignedOut>

            <div className="hidden w-[1px] bg-primary-blue-50 dark:bg-primary-gray-850 md:block" />

            {/* Theme Toggle */}
            <span className="flex items-center justify-center">
              <ThemeToggle setIsDarkMode={setIsDarkMode} />
            </span>

            {/* Mobile Menu */}
            <Image
              src={
                isDarkMode === "dark"
                  ? "/nav-icons/menu-dark.svg"
                  : "/nav-icons/menu.svg"
              }
              alt="menu"
              width={24}
              height={24}
              className="cursor-pointer md:hidden"
              onClick={() => setIsNavOpen(true)}
            />
          </section>

          {/* Modal */}
          <NavModal isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
        </aside>
      </div>
    </nav>
  );
};

export default Nav;
