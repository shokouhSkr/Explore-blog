import { Post } from "@/types";
import { PostContent } from "..";
import Image from "next/image";

const PostHero = ({ post, locale }: { post: Post; locale: string }) => {
  return (
    <div>
      <PostContent locale={locale} isSinglePostPage post={post} />
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
