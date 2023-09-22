import { getReadingTime, getRelativeDate } from "@/helpers/utils";
import { Post } from "@/types";
import Link from "next/link";

type PostTagsProps = {
  post: Post;
  locale: string;
  isSinglePostPage?: boolean;
};

const PostTags = async ({ locale, post, isSinglePostPage = false }: PostTagsProps) => {
  return (
    <div
      className={`${
        isSinglePostPage ? "text-sm" : "text-xs @md:text-sm"
      } text-neutral-400 flex flex-wrap items-center gap-2`}
    >
      {/* CATEGORY */}
      <Link
        href={`${
          post.catSlug === "cities" || post.catSlug === "شهرها"
            ? `/${locale}/cities`
            : `/${locale}/experiences`
        }`}
        className={`font-medium capitalize ${
          post.catSlug === "cities" || post.catSlug === "شهرها"
            ? "text-emerald-600"
            : "text-indigo-500"
        }`}
      >
        {post.catSlug}
      </Link>

      {/* AUTHOR */}
      <div className="w-2 h-2 rounded-full bg-neutral-200" />
      <div>{post?.user?.name}</div>

      {/* READING DURATION */}
      <div className="w-2 h-2 rounded-full bg-neutral-200" />
      <div>{getReadingTime(post.body, locale)}</div>

      {/* PUBLISH TIME */}
      <div className="w-2 h-2 rounded-full bg-neutral-200" />
      <div>{getRelativeDate(post.createdAt, locale)}</div>
    </div>
  );
};

export default PostTags;
