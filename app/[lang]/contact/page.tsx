"use client";

import { Container, PostForm } from "@/components";
import { getDictionary } from "@/helpers/utils";
import { Send } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ContactPage({ params }: { params: { lang: string } }) {
  const [dictionary, setDictionary] = useState({} as any);
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    async function fetchDictionary() {
      const dictionary = await getDictionary(params.lang);
      setDictionary(dictionary);
    }
    fetchDictionary();
  }, []);

  if (status === "loading") return <Container>Loading...</Container>;
  if (status === "unauthenticated") {
    router.push("/");
  }

  return (
    <Container locale={params.lang}>
      <div className="mb-10 text-sm sm:text-base">
        <h2 className="text-xl sm:text-2xl flex items-center gap-2 font-semibold mb-4">
          {dictionary?.contact?.title} <Send />
        </h2>

        <p className="text-gray-600 dark:text-neutral-400">{dictionary?.contact?.message}</p>
      </div>

      <PostForm dictionary={dictionary} />
    </Container>
  );
}
