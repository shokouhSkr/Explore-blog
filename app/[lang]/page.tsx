import { CTACard, Container, PostCard, PostList } from "@/components";
import { getAllPosts, getDictionary } from "@/helpers/utils";
import { Post } from "@/types";

export default async function HomePage({ params }: { params: { lang: string } }) {
  const dictionary = await getDictionary(params.lang);
  const { posts }: { posts: Post[] } = await getAllPosts();

  const cities: Post[] = posts?.filter((post) => post.catSlug === "cities");
  const experiences: Post[] = posts?.filter((post) => post.catSlug === "experiences");

  return (
    <Container>
      <main className="h-auto space-y-10">
        <PostCard locale={params.lang} post={cities?.[0]} />
        <PostList
          locale={params.lang}
          posts={cities.filter((_, index) => index > 0 && index < 3)}
        />

        <CTACard locale={params.lang} dictionary={dictionary} />

        <PostCard locale={params.lang} reverse post={experiences?.[0]} />
        <PostList
          locale={params.lang}
          posts={experiences.filter((_, index) => index > 0 && index < 3)}
        />
      </main>
    </Container>
  );
}
