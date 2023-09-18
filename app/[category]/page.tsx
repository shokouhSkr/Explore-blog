import { Container, Pagination, PostList } from "@/components";
import prisma from "@/helpers/connect";
import { POST_PER_PAGE } from "@/helpers/constants";
import { getPaginatedPosts } from "@/helpers/utils";
import { Post } from "@/types";
import { notFound } from "next/navigation";

// The new getStaticPaths: It generates all versions of this page (cities and experiences) at built time.
export const generateStaticParams = async () => {
  try {
    const categories = await prisma.category.findMany({
      select: { slug: true },
    });

    return categories.map((category) => ({
      category: category.slug,
    }));
  } catch (error) {
    console.log(error);
    throw new Error("error generating params");
  }
};

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { page: number };
}) {
  // Fetch and filter categories by slug
  const category = await prisma.category.findUnique({
    where: {
      slug: params.category,
    },
  });

  if (!category) notFound();
  console.log("category: ", category);

  // Fetch filtered posts by category
  const page = Number(searchParams.page) || 1;
  const { posts, count }: { posts: Post[]; count: number } = await getPaginatedPosts(
    page,
    category.slug
  );

  return (
    <Container>
      <div className="mb-10">
        <h1 className="text-4xl mb-1 font-semibold">{category?.title}</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">{category?.description}</p>
      </div>

      <div className="mb-24">
        <PostList posts={posts} />
      </div>

      {count > POST_PER_PAGE && <Pagination page={page} count={count} />}
    </Container>
  );
}
