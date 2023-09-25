"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components";
import { GithubIcon } from "lucide-react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { getDictionary } from "@/helpers/utils";
import Loading from "@/components/common/Loading";

export default function LoginPage({ params }: { params: { lang: string } }) {
  const { status } = useSession();
  const router = useRouter();
  const [dictionary, setDictionary] = useState({} as any);

  useEffect(() => {
    async function fetchDictionary() {
      const dictionary = await getDictionary(params.lang);
      setDictionary(dictionary);
    }
    fetchDictionary();
  }, [params.lang]);

  if (status === "loading") return <Loading />;
  if (status === "authenticated") {
    toast.success(dictionary.toasts.authentication.login.successMessage);
    router.push(`/${params.lang}`);
  }

  return (
    <Container>
      <div className="mx-auto grid my-12 mb-20 font-semibold sm:w-96 text-white 2xs:text-lg place-items-center p-4 text-base 2xs:px-6 py-16 space-y-10 rounded-md shadow bg-white dark:bg-neutral-700">
        <button
          onClick={() => signIn("github")}
          className={`bg-neutral-900 h-14 active:scale-[.98] transition-all duration-200 hover:bg-neutral-950 flex-between gap-4 rounded-md w-full text-center px-8 2xs:w-[280px]`}
        >
          <span>
            <GithubIcon size={28} />
          </span>
          <span>Sign in with Github</span>
        </button>

        <button
          onClick={() => signIn("google")}
          className={`bg-red-500 h-14 active:scale-[.98] transition-all duration-200 hover:bg-red-600 flex-between gap-4 rounded-md w-full text-center px-8 2xs:w-[280px]`}
        >
          <span className="text-3xl">G</span>
          <span>Sign in with Google</span>
        </button>
      </div>
    </Container>
  );
}
