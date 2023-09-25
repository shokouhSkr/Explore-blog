"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import ctaCardImg from "../../public/images/CTA-card.webp";
import { getAllEmails } from "@/helpers/utils";
import { toast } from "react-toastify";

const CTACard = ({ dictionary, locale }: { dictionary: any; locale: string }) => {
  const [emailAddress, setEmailAddress] = useState("");
  const [emailsCount, setEmailsCount] = useState(152);
  const [isHandling, setIsHandling] = useState(false);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (!emailAddress) return;

      setIsHandling(true);
      const { email } = await getAllEmails();
      const emailAddresses = email.map((e: any) => e.email);

      if (emailAddresses.includes(emailAddress)) {
        toast.error(dictionary.toasts.cta.errorMessage);
        setEmailAddress("");
        setIsHandling(false);
        return;
      }

      await fetch(`/api/emails`, {
        method: "POST",
        body: JSON.stringify({
          email: emailAddress,
        }),
      });

      toast.success(dictionary.toasts.cta.successMessage);
      setEmailsCount((prevCount) => prevCount + 1);
      setEmailAddress("");
      setIsHandling(false);
    } catch (error) {
      toast.error(dictionary.toasts.wrongMessage);
      setEmailAddress("");
      setIsHandling(false);
    }
  };

  return (
    <div className="relative px-6 py-10 my-10 overflow-hidden rounded-md bg-slate-100">
      {/* OVERLAY */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/95 dark:from-neutral-600/95 via-white/70 dark:via-gray-500/70 to-white/30 dark:to-gray-500/30" />

      {/* IMAGE */}
      <Image fill alt="CTA Card Image" className="object-cover object-center" src={ctaCardImg} />

      {/* CONTENT */}
      <div style={{ direction: locale === "fa" ? "rtl" : "ltr" }} className="relative z-20">
        <span dir="ltr" className="text-lg font-medium">
          #exploretheworld
        </span>
        <h3 className="font-semibold mt-3 text-3xl">{dictionary.ctaCard.title}</h3>
        <p className="max-w-lg mt-2 text-lg">{dictionary.ctaCard.description}</p>

        {/* CONTENT - FORM */}
        <form onSubmit={submitHandler} className="flex items-center w-full gap-2 mt-6">
          <input
            type="email"
            name="email"
            value={emailAddress}
            onChange={(e) => {
              setEmailAddress(e.target.value);
            }}
            placeholder={dictionary.ctaCard.placeholder}
            className="w-full px-3 py-2 text-base text-neutral-800 rounded-md outline-none md:w-auto placeholder:text-sm bg-white/80 focus:ring-2 ring-gray-500"
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
            {emailsCount}
          </span>{" "}
          {dictionary.ctaCard.subscriberText2}
        </div>
      </div>
    </div>
  );
};

export default CTACard;
