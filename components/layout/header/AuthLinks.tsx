"use client";

import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

type AuthLinksProps = {
  isMobileView?: boolean;
  onSetIsOpen: Dispatch<SetStateAction<boolean>> | null;
};

const AuthLinks = ({ isMobileView, onSetIsOpen }: AuthLinksProps) => {
  const { status } = useSession();

  return (
    <>
      {status === "unauthenticated" && (
        <li>
          <Link
            href="/login"
            onClick={() => {
              if (!onSetIsOpen) return;
              onSetIsOpen(false);
            }}
            className={`${
              isMobileView &&
              "w-full py-2 inline-block pl-4 text-sm hover:bg-neutral-100 transition-colors duration-200"
            }`}
          >
            Login
          </Link>
        </li>
      )}

      {status === "authenticated" && (
        <>
          <li>
            <Link
              href="/write"
              onClick={() => {
                if (!onSetIsOpen) return;
                onSetIsOpen(false);
              }}
              className={`${
                isMobileView &&
                "w-full py-2 inline-block pl-4 text-sm hover:bg-neutral-100 transition-colors duration-200"
              }`}
            >
              Write
            </Link>
          </li>

          <span
            onClick={() => {
              if (!onSetIsOpen) return;
              onSetIsOpen(false);
              signOut();

              console.log(signOut);
            }}
            className={`${
              isMobileView &&
              "w-full py-2 inline-block pl-4 text-sm hover:bg-neutral-100 transition-colors duration-200"
            } cursor-pointer`}
          >
            Logout
          </span>
        </>
      )}
    </>
  );
};

export default AuthLinks;
