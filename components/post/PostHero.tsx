import { Post } from "@/types";
import { PostContent } from "..";
import Image from "next/image";

const PostHero = ({ post }: { post: Post }) => {
  return (
    <div>
      <PostContent isSinglePostPage post={post} />
      <Image
        src={post.image}
        alt={post.title}
        width={1280}
        height={500}
        className="object-cover object-center rounded-md h-[300px] md:h-[500px] mt-6"
      />
    </div>
  );
};

export default PostHero;
