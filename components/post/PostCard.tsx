import PostContent from "./PostContent";
import { Post } from "@/types";
import Image from "next/image";

type PostProps = {
  post: Post;
  locale: string;
  layout?: "horizontal" | "vertical";
  reverse?: boolean;
};

const PostCard = ({ post, locale, layout = "horizontal", reverse = false }: PostProps) => {
  let translatedPost = post;
  if (locale === "fa")
    translatedPost = {
      ...post,
      title: post.translation[0].title,
      description: post.translation[0].description,
      body: post.translation[0].body,
      catSlug: post.translation[0].catSlug,
    };

  return (
    <div
      key={translatedPost.id}
      style={{ direction: locale === "fa" ? "rtl" : "ltr" }}
      className={`@container ${
        layout === "horizontal"
          ? "grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-center"
          : "sm:space-y-10 space-y-6"
      }`}
    >
      {/* IMAGE */}
      <Image
        src={translatedPost.image}
        alt={translatedPost.title}
        width={600}
        height={300}
        className={`${
          reverse ? "md:order-last" : ""
        } rounded-md w-full object-cover object-center max-h-[300px] h-full`}
      />

      {/* CONTENT */}
      <PostContent locale={locale} post={translatedPost} />
    </div>
  );
};

export default PostCard;
