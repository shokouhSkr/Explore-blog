"use client";

import { Container } from "@/components";
import { GithubIcon, Mail } from "lucide-react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { data, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <Container>Loading...</Container>;
  console.log("data: ", data, " status: ", status);

  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <Container>
      <div className="mx-auto grid font-semibold sm:w-96 text-white 2xs:text-lg place-items-center p-4 text-base 2xs:px-6 py-16 space-y-10 rounded-md shadow bg-white dark:bg-neutral-700">
        <button
          onClick={() => signIn("google")}
          className={`bg-[#ff5555] py-3 flex-between gap-4 rounded-md w-full text-center px-8 2xs:w-[280px]`}
        >
          <span>
            <GithubIcon />
          </span>
          <span>Sign in with Google</span>
        </button>
        <button
          onClick={() => signIn("github")}
          className={`bg-neutral-900 py-3 flex-between gap-4 rounded-md w-full text-center px-8 2xs:w-[280px]`}
        >
          <span>
            <GithubIcon />
          </span>
          <span>Sign in with Github</span>
        </button>
        <button
          // onClick={() => signIn("github")}
          className={`bg-[#3b82f6] py-3 flex-between gap-4 rounded-md w-full text-center px-8 2xs:w-[280px]`}
        >
          <span>
            <Mail />
          </span>
          <span>Sign in with Email</span>
        </button>
      </div>
    </Container>
  );
}
