"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import ctaCardImg from "../../public/images/CTA-card.webp";

const CTACard = ({ dictionary, locale }: { dictionary: any; locale: string }) => {
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState(152);
  const [isHandling, setIsHandling] = useState(false);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setIsHandling(true);
      // await directus.items("subscribers").createOne({
      //   email,
      // });

      setEmail("");
      setEmails((prev) => prev + 1);
      setIsHandling(false);
    } catch (error) {
      console.log(error);
      setIsHandling(false);
    }
  };

  return (
    <div className="relative px-6 py-10 overflow-hidden rounded-md bg-slate-100">
      {/* OVERLAY */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/95 dark:from-gray-600/95 via-white/70 dark:via-gray-600/70 to-white/30 dark:to-gray-600/30" />

      {/* IMAGE */}
      <Image fill alt="CTA Card Image" className="object-cover object-center" src={ctaCardImg} />

      {/* CONTENT */}
      <div style={{ direction: locale === "fa" ? "rtl" : "ltr" }} className="relative z-20">
        <span dir="ltr" className="text-lg font-medium">
          #exploretheworld
        </span>
        <h3 className="font-semibold mt-3 text-4xl">{dictionary.ctaCard.title}</h3>
        <p className="max-w-lg mt-2 text-lg">{dictionary.ctaCard.description}</p>

        {/* CONTENT - FORM */}
        <form onSubmit={submitHandler} className="flex items-center w-full gap-2 mt-6">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder={dictionary.ctaCard.placeholder}
            className="w-full px-3 py-2 text-base text-neutral-800 rounded-md outline-none md:w-auto placeholder:text-sm bg-white/80 focus:ring-2 ring-neutral-600"
          />
          <button
            type="submit"
            className="px-3 py-2 hover:bg-neutral-800/90 active:bg-neutral-800/90 active:scale-[.98] transition-all duration-200 rounded-md whitespace-nowrap bg-neutral-900 text-neutral-200"
          >
            {!isHandling ? dictionary.ctaCard.signup : dictionary.ctaCard.signingup}
          </button>
        </form>

        {/* SUBSCRIBERS */}
        <div className="mt-4">
          {dictionary.ctaCard.subscriberText1}{" "}
          <span className="px-2 py-1 text-sm rounded-md bg-neutral-700 text-neutral-100">
            {emails}
          </span>{" "}
          {dictionary.ctaCard.subscriberText2}
        </div>
      </div>
    </div>
  );
};

export default CTACard;
