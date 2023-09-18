import { getIcon } from "@/helpers/utils";
import Link from "next/link";

type SocialLinkProps = {
  platform: string;
  link: string;
  isShareURL?: boolean;
};

const SocialLink = ({ platform, link, isShareURL }: SocialLinkProps) => {
  return (
    <div
      className={`${
        isShareURL &&
        "py-2 px-3 rounded-md text-neutral-600 bg-slate-200 hover:text-neutral-100 hover:bg-neutral-600 duration-150 ease-in-out transition-colors cursor-pointer"
      } ${!isShareURL && "hover:-translate-y-1 duration-300"}`}
    >
      <Link href={link}>{getIcon(platform)}</Link>
    </div>
  );
};

export default SocialLink;
