"use client";

import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

type AuthLinksProps = {
  isMobileView?: boolean;
  dictionary: any;
  locale: string;
  onSetIsOpen: Dispatch<SetStateAction<boolean>> | null;
};

const AuthLinks = ({ isMobileView, locale, dictionary, onSetIsOpen }: AuthLinksProps) => {
  const { status } = useSession();

  return (
    <>
      {status === "unauthenticated" && (
        <li>
          <Link
            href={`/${locale}/login`}
            onClick={() => {
              if (!onSetIsOpen) return;
              onSetIsOpen(false);
            }}
            className={`${
              isMobileView &&
              "w-full py-2 inline-block pl-4 text-sm hover:bg-neutral-100 transition-colors duration-200"
            }`}
          >
            {dictionary.navigation.links.login}
          </Link>
        </li>
      )}

      {status === "authenticated" && (
        <>
          <li>
            <Link
              href={`/${locale}/write`}
              onClick={() => {
                if (!onSetIsOpen) return;
                onSetIsOpen(false);
              }}
              className={`${
                isMobileView &&
                "w-full py-2 inline-block pl-4 text-sm hover:bg-neutral-100 transition-colors duration-200"
              }`}
            >
              {dictionary.navigation.links.write}
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
            {dictionary.navigation.links.logout}
          </span>
        </>
      )}
    </>
  );
};

export default AuthLinks;
