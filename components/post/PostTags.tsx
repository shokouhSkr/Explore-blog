import { getReadingTime, getRelativeDate } from "@/helpers/utils";
import { Post } from "@/types";
import Link from "next/link";

type PostTagsProps = {
  post: Post;
  isSinglePostPage?: boolean;
};

const PostTags = ({ post, isSinglePostPage = false }: PostTagsProps) => {
  return (
    <div
      className={`${
        isSinglePostPage ? "text-sm" : "text-xs @md:text-sm"
      } text-neutral-400 flex flex-wrap items-center gap-2`}
    >
      {/* CATEGORY */}
      <Link
        href={`${post.catSlug === "cities" ? "/cities" : "/experiences"}`}
        className={`font-medium capitalize ${
          post.catSlug === "cities" ? "text-emerald-600" : "text-indigo-600"
        }`}
      >
        {post.catSlug}
      </Link>

      {/* AUTHOR */}
      <div className="w-2 h-2 rounded-full bg-neutral-200" />
      <div>{post?.user?.name}</div>

      {/* READING DURATION */}
      <div className="w-2 h-2 rounded-full bg-neutral-200" />
      <div>{getReadingTime(post.body)}</div>

      {/* PUBLISH TIME */}
      <div className="w-2 h-2 rounded-full bg-neutral-200" />
      <div>{getRelativeDate(post.createdAt)}</div>
    </div>
  );
};

export default PostTags;
