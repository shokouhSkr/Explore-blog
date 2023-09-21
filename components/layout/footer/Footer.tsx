import { siteInfo } from "@/helpers/constants";
import { Container, SocialLink } from "@/components";
import Link from "next/link";

const { siteName } = siteInfo;

const Footer = ({ locale, dictionary }: { locale: string; dictionary: any }) => {
  return (
    <div className="py-6 border-t dark:border-t-neutral-600 mt-10">
      <Container locale={locale}>
        {/* NAME AND DESCRIPTION */}
        <div>
          <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-indigo-600">
            {siteName}
          </span>
          <p className="max-w-md text-neutral-700 mt-2 text-xl dark:text-neutral-400">
            {dictionary.footer.description}
          </p>
        </div>

        {/* SOCIAL AND CURRENTLY AT */}
        <div className="mt-6 flex-between flex-wrap gap-4">
          {/* LEFT */}
          <div>
            <span dir="ltr" className="font-medium text-lg">
              #exploretheworld
            </span>

            <ul className="flex-between text-neutral-600 gap-3 mt-2">
              <SocialLink platform="twitter" link={siteInfo.socialLinks.twitter} />
              <SocialLink platform="instagram" link={siteInfo.socialLinks.instagram} />
              <SocialLink platform="github" link={siteInfo.socialLinks.github} />
              <SocialLink platform="youtube" link={siteInfo.socialLinks.youtube} />
              <SocialLink platform="linkedin" link={siteInfo.socialLinks.linkedin} />
            </ul>
          </div>

          {/* RIGHT */}
          <div>
            <div className="text-sm text-neutral-400 mb-1">{dictionary.footer.currentlyAtText}</div>
            <div className="px-3 py-2 shadow dark:text-neutral-800 rounded-md bg-white flex items-center gap-2">
              <div className="bg-emerald-400 rounded-full w-2 h-2" />
              {dictionary.footer.location}
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="py-3 border-t dark:border-t-neutral-600 flex-between gap-4 flex-wrap mt-6">
          <div className="text-sm text-neutral-400">
            {dictionary.footer.rightsText} {new Date().getFullYear()}
          </div>
          <div>
            {dictionary.footer.creatorText}{" "}
            <Link
              dir="ltr"
              href={siteInfo.socialLinks.twitter}
              className="underline underline-offset-4"
            >
              @shokouhSkr
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
