import PostContent from "./PostContent";
import { Post } from "@/types";
import Image from "next/image";

type PostProps = {
  post: Post;
  layout?: "horizontal" | "vertical";
  reverse?: boolean;
};

const PostCard = ({ post, layout = "horizontal", reverse = false }: PostProps) => {
  return (
    <div
      key={post.id}
      className={`@container ${
        layout === "horizontal"
          ? "grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
          : "space-y-10"
      } `}
    >
      {/* IMAGE */}
      <Image
        src={post.image}
        alt={post.title}
        width={600}
        height={300}
        priority={true}
        className={`${
          reverse ? "md:order-last" : ""
        } rounded-md w-full object-cover object-center max-h-[300px] h-full`}
      />

      {/* CONTENT */}
      <PostContent post={post} />
    </div>
  );
};

export default PostCard;
