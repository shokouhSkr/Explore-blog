"use client";

import { useState } from "react";
import Link from "next/link";
import { Container, ThemeToggle, LangSwitcher, AuthLinks } from "../..";
import { MoreVertical } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* BACKDROP */}
      {isOpen && <div className="fixed inset-0 z-20" onClick={() => setIsOpen(false)} />}

      <div className="border-b dark:border-b-neutral-600 sticky z-30 top-0 inset-x-0 bg-white dark:bg-neutral-800/40 bg-opacity-50 backdrop-blur-md">
        <Container>
          <div className="flex-between py-5">
            {/* LOGO */}
            <div className="flex items-center gap-3">
              <Link href="/" className="font-bold text-lg">
                Explorer
              </Link>
              <LangSwitcher />
            </div>

            {/* THEME TOGGLE AND LINKS */}
            <nav>
              <ul className="flex relative items-center gap-4 text-neutral-600 dark:text-neutral-300">
                <ThemeToggle />

                <MoreVertical
                  onClick={() => setIsOpen(!isOpen)}
                  className="md:hidden cursor-pointer"
                  size={20}
                  strokeWidth={1.25}
                  fill="current"
                />

                {/* MOBILE NAVIGATION */}
                <div
                  className={`${
                    isOpen ? "flex" : "hidden"
                  } absolute top-9 md:hidden dark:text-neutral-800 right-[9px] flex-col bg-white shadow-md rounded-md overflow-hidden py-2 w-24`}
                >
                  <li>
                    <Link
                      href="/contact"
                      onClick={() => setIsOpen(false)}
                      className="w-full pl-4 py-2 text-sm hover:bg-neutral-100 transition-colors duration-200 inline-block"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      onClick={() => setIsOpen(false)}
                      className="w-full py-2 inline-block text-sm pl-4 hover:bg-neutral-100 transition-colors duration-200"
                    >
                      About
                    </Link>
                  </li>
                  <AuthLinks isMobileView onSetIsOpen={setIsOpen} />
                </div>

                {/* DESKTOP NAVIGATION */}
                <div className="md:flex hidden items-center gap-4">
                  <li>
                    <Link href="/contact">Contact</Link>
                  </li>
                  <li>
                    <Link href="/about">About</Link>
                  </li>
                  <AuthLinks onSetIsOpen={setIsOpen} />
                </div>
              </ul>
            </nav>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Navigation;
