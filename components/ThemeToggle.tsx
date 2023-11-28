"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ThemeToggleProps } from "@/types";

export default function ThemeToggle({ setIsDarkMode }: ThemeToggleProps) {
  const [theme, setTheme] = useState<string>("");

  // sets the theme on initial load
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setIsDarkMode("dark");
      setTheme("moon-icon");
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");

      return;
    }
    setIsDarkMode("light");
    setTheme("sun-icon");
    localStorage.theme = "light";
    document.documentElement.classList.remove("dark");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // toggles the light/dark theme
  const toggleTheme = () => {
    if (localStorage.theme === "light") {
      setIsDarkMode("dark");
      setTheme("moon-icon");
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");

      return;
    }

    setIsDarkMode("light");
    setTheme("sun-icon");
    localStorage.theme = "light";
    document.documentElement.classList.remove("dark");
  };

  return (
    <Image
      src={`/nav-icons/${theme}.svg`}
      alt="sun and moon icon toggle"
      width={20}
      height={20}
      className="cursor-pointer"
      onClick={toggleTheme}
    />
  );
}
