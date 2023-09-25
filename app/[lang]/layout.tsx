import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Footer, Header } from "@/components";
import Providers from "../../providers/Providers";
import { getDictionary } from "@/helpers/utils";
import { siteInfo } from "@/helpers/constants";

const inter = Inter({ subsets: ["latin"] });

export const generateMetadata = async ({ params: { lang } }: { params: { lang: string } }) => {
  const dictionary = await getDictionary(lang);

  return {
    title: {
      template: siteInfo.siteName + " | %s", // if there is any title, next js puts it to %s
      default: siteInfo.siteName,
    },
    description: dictionary.footer.description,
  };
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
        className={`${inter.className} font-iranyekan
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
