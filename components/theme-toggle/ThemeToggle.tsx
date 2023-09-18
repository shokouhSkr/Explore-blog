"use client";

import { useTheme } from "next-themes";
import { MoonStar, SunMedium } from "lucide-react";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="flex-between w-14 dark:bg-neutral-100 bg-neutral-800 px-1 cursor-pointer rounded-full h-7 gap-2 relative"
    >
      <SunMedium size={20} strokeWidth={1.25} color="#eab308" fill="#eab308" />
      <div
        className={`${
          resolvedTheme === "dark" ? "right-0" : "left-0"
        } w-5 h-5 m-1 rounded-full bg-neutral-100 dark:bg-neutral-800 absolute`}
      />
      <MoonStar size={18} strokeWidth={1.25} color="#eab308" fill="#eab308" />
    </div>
  );
};

export default ThemeToggle;
