"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LangSwitcher = ({ locale }: { locale: string }) => {
  const pathname = usePathname();
  const targetLanguage = locale === "en" ? "fa" : "en";

  const redirectTarget = () => {
    if (!pathname) return "/";

    const segments = pathname.split("/");
    segments[1] = targetLanguage; // changes the language code to the target language

    return segments.join("/");
  };

  return (
    <Link href={redirectTarget()} locale={targetLanguage}>
      {/* insert flag emojis */}
      {/* <span>{targetLanguage === "en" ? "" : ""}</span> */}
      {targetLanguage.toUpperCase()}
    </Link>
  );
};

export default LangSwitcher;
