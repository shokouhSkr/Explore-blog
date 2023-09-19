import { CTACard, Container, PostCard, PostList } from "@/components";
import { getAllPosts } from "@/helpers/utils";
import { Post } from "@/types";

export default async function HomePage() {
  const { posts }: { posts: Post[] } = await getAllPosts();

  const cities: Post[] = posts.filter((post) => post.catSlug === "cities");
  const experiences: Post[] = posts.filter((post) => post.catSlug === "experiences");

  return (
    <Container>
      <main className="h-auto space-y-10">
        <PostCard post={cities[0]} />
        <PostList posts={cities.filter((_, index) => index > 0 && index < 3)} />

        <CTACard />

        <PostCard reverse post={experiences[0]} />
        <PostList posts={experiences.filter((_, index) => index > 0 && index < 3)} />
      </main>
    </Container>
  );
}
