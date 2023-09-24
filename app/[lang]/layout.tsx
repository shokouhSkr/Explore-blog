import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Footer, Header } from "@/components";
import Providers from "../../providers/Providers";
import { getDictionary } from "@/helpers/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Explorer",
  description: "shares experiences and cities around the world!",
};

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${inter.className}
         dark:bg-neutral-800 bg-[#FAFAFA] dark:text-neutral-100`}
      >
        <Providers>
          <Header dictionary={dictionary} locale={lang} />
          <div className="pt-10">{children}</div>
          <Footer dictionary={dictionary} locale={lang} />
        </Providers>
      </body>
    </html>
  );
}
