"use client";

import { useEffect, useState } from "react";
import { Container, PostForm } from "@/components";
import { getDictionary } from "@/helpers/utils";
import { Send } from "lucide-react";

export default function ContactPage({ params }: { params: { lang: string } }) {
  const [dictionary, setDictionary] = useState({} as any);

  useEffect(() => {
    async function fetchDictionary() {
      const dictionary = await getDictionary(params.lang);
      setDictionary(dictionary);
    }
    fetchDictionary();
  }, [params.lang]);

  return (
    <Container locale={params.lang}>
      <div className="mb-10 text-sm sm:text-base">
        <h2 className="text-2xl md:text-3xl flex items-center gap-2 font-semibold mb-4">
          {dictionary?.contact?.title} <Send />
        </h2>

        <p className="text-gray-600 md:text-lg dark:text-neutral-400">
          {dictionary?.contact?.message}
        </p>
      </div>

      <PostForm dictionary={dictionary} />
    </Container>
  );
}
