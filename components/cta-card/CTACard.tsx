"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import ctaCardImg from "../../public/images/CTA-card.webp";

const CTACard = () => {
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
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/95 via-white/70 to-white/30" />

      {/* IMAGE */}
      <Image fill alt="CTA Card Image" className="object-cover object-center" src={ctaCardImg} />

      {/* CONTENT */}
      <div className="relative z-20 dark:text-neutral-800">
        <div className="text-lg font-medium">#exploretheworld</div>
        <h3 className="mt-3 text-4xl font-semibold">Explore the world with me!</h3>
        <p className="max-w-lg mt-2 text-lg">
          Explore the world with me! I&apos;m traveling around the 🌍. I&apos;ve visited most of the
          great cities of US and currently I&apos;m traveling in EU. Join me!
        </p>

        {/* CONTENT - FORM */}
        <form onSubmit={submitHandler} className="flex items-center w-full gap-2 mt-6">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Write your email."
            className="w-full px-3 py-2 text-base rounded-md outline-none md:w-auto placeholder:text-sm bg-white/80 focus:ring-2 ring-neutral-600"
          />
          <button
            type="submit"
            className="px-3 py-2 hover:bg-neutral-800/90 active:bg-neutral-800/90 transition-all duration-200 rounded-md whitespace-nowrap bg-neutral-900 text-neutral-200"
          >
            {!isHandling ? "Sign Up" : "Sending..."}
          </button>
        </form>

        {/* Subscribers for Server Actions Approach */}
        {/* SUBSCRIBERS */}
        <div className="mt-4 text-neutral-700">
          Join our{" "}
          <span className="px-2 py-1 text-sm rounded-md bg-neutral-700 text-neutral-100">
            {emails}
          </span>{" "}
          subscribers!
        </div>
      </div>
    </div>
  );
};

export default CTACard;
