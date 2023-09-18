import { Post } from "@/types";
import { ArrowRight } from "lucide-react";
import PostTags from "./PostTags";
import Link from "next/link";

type PostContentProps = {
  post: Post;
  isSinglePostPage?: boolean;
};

const PostContent = ({ post, isSinglePostPage = false }: PostContentProps) => {
  return (
    <div className="space-y-2">
      {/* TAGS */}
      <PostTags isSinglePostPage post={post} />

      {/* TITLE */}
      <h2
        className={`${
          isSinglePostPage
            ? "text-2xl md:text-3xl lg:text-4xl font-bold"
            : "text-xl @md:text-2xl @lg:text-3xl font-medium"
        } dark:text-neutral-100`}
      >
        {post.title}
      </h2>

      {/* DESCRIPTION */}
      <p className="text-base @lg:text-lg leading-snug text-neutral-600 dark:text-neutral-400">
        {post.description}
      </p>

      {/* READ MORE */}
      {!isSinglePostPage && (
        <Link href={`/post/${post.slug}`} className="flex items-center gap-2 pt-2">
          Read More <ArrowRight size={14} />
        </Link>
      )}
    </div>
  );
};

export default PostContent;
