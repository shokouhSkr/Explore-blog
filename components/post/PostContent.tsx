import { Post } from "@/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PostTags from "./PostTags";
import Link from "next/link";
import { getDictionary } from "@/helpers/utils";

type PostContentProps = {
  post: Post;
  locale: string;
  isSinglePostPage?: boolean;
};

const PostContent = async ({ post, locale, isSinglePostPage = false }: PostContentProps) => {
  const dictionary = await getDictionary(locale);

  return (
    <div className="space-y-2">
      {/* TAGS */}
      <PostTags locale={locale} isSinglePostPage post={post} />

      {/* TITLE */}
      <h2
        className={`${
          isSinglePostPage
            ? "text-2xl md:text-3xl lg:text-4xl font-semibold"
            : "text-xl @md:text-2xl @lg:text-3xl font-medium"
        } dark:text-neutral-100`}
      >
        {post.title}
      </h2>

      {/* DESCRIPTION */}
      <p className="text-lg @lg:text-xl leading-snug text-neutral-600 dark:text-neutral-400">
        {post.description}
      </p>

      {/* READ MORE */}
      {!isSinglePostPage && (
        <Link href={`/${locale}/post/${post.slug}`} className="flex items-center gap-2 pt-2">
          {dictionary.buttons.readMore}{" "}
          {locale === "fa" ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
        </Link>
      )}
    </div>
  );
};

export default PostContent;
