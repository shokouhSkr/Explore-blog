import { Post } from "@/types";
import { PostCard } from "..";

type PostListProps = {
  posts: Post[];
  locale: string;
  page?: number;
  layout?: "vertical" | "horizontal";
};

const PostList = ({ posts, locale, layout = "vertical" }: PostListProps) => {
  return (
    // lg:grid-flow-col lg:auto-cols-fr => If we have 4 or 5 or 100 posts, they all place side by side automatically
    <div
      className="flex flex-col md:grid md:grid-cols-2 gap-10"
      //  className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:grid-flow-col lg:auto-cols-fr"
    >
      {posts.map((post) => (
        <PostCard locale={locale} key={post.id} post={post} layout={layout} />
      ))}
    </div>
  );
};

export default PostList;
