"use client";

import { Container, PostForm } from "@/components";
import { PencilLine } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function WritePage() {
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") return <Container>Loading...</Container>;

  if (status === "unauthenticated") {
    router.push("/");
  }

  return (
    <Container>
      <div className="mb-10 text-sm md:text-base">
        <h2 className="text-2xl flex items-center gap-2 font-bold mb-4">
          Write a New Post <PencilLine />
        </h2>

        <p className="text-gray-600 dark:text-neutral-400">
          Share your story by filling out the fields below. The title and description will be used
          for the post excerpt.
          <br />
          Additionally, you can highlight and style specific parts of your story within the text
          area.
        </p>
      </div>

      <PostForm />
    </Container>
  );
}
