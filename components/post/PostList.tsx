import { Post } from "@/types";
import { PostCard } from "..";

type PostListProps = {
  posts: Post[];
  page?: number;
  layout?: "vertical" | "horizontal";
};

const PostList = ({ posts, layout = "vertical" }: PostListProps) => {
  return (
    // lg:grid-flow-col lg:auto-cols-fr => If we have 4 or 5 or 100 posts, they all place side by side automatically
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-10"
      //  className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:grid-flow-col lg:auto-cols-fr"
    >
      {posts.map((post) => (
        <PostCard key={post.id} post={post} layout={layout} />
      ))}
    </div>
  );
};

export default PostList;
