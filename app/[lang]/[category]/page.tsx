import { Container, Pagination, PostList } from "@/components";
import prisma from "@/helpers/connect";
import { POST_PER_PAGE } from "@/helpers/constants";
import { getCategories, getPaginatedPosts } from "@/helpers/utils";
import { Post } from "@/types";
import { notFound } from "next/navigation";

// DYNAMIC METADATA
export const generateMetadata = async ({ params }: { params: { category: string } }) => {
  return {
    title: params.category,
  };
};

// The new getStaticPaths: It generates all versions of this page (cities and experiences) at built time.
export const generateStaticParams = async () => {
  try {
    const categories = await prisma.category.findMany({
      select: { slug: true },
    });

    const params = categories?.map((category) => {
      return { category: category.slug as string, locale: "en" };
    });

    const localizedParams = categories?.map((category) => {
      return { category: category.slug as string, locale: "fa" };
    });

    const allParams = params?.concat(localizedParams ?? []);

    return allParams || [];
  } catch (error) {
    console.log(error);
    throw new Error("error generating params");
  }
};

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { category: string; lang: string };
  searchParams: { page: number };
}) {
  // Fetch and filter categories by slug
  const category = await prisma.category.findUnique({
    where: {
      slug: params.category,
    },
    include: {
      posts: true,
      translation: true,
    },
  });

  if (!category) notFound();

  let translatedCategory;
  if (params.lang === "fa") translatedCategory = category.translation[0];
  if (params.lang === "en") translatedCategory = category;

  // Fetch filtered posts by category
  const page = Number(searchParams.page) || 1;
  const { posts, count }: { posts: Post[]; count: number } = await getPaginatedPosts(
    page,
    category.slug
  );

  return (
    <Container locale={params.lang}>
      <div className="mb-10">
        <h1 className="text-4xl mb-1 font-semibold">{translatedCategory?.title}</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          {translatedCategory?.description}
        </p>
      </div>

      <div className="mb-24">
        <PostList locale={params.lang} posts={posts} />
      </div>

      {count > POST_PER_PAGE && <Pagination locale={params.lang} page={page} count={count} />}
    </Container>
  );
}
