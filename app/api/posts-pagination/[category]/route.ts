import prisma from "@/helpers/connect";
import { NextRequest, NextResponse } from "next/server";

// Get paginated posts by their categories
export const GET = async (req: NextRequest, { params }: { params: { category: string } }) => {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  const categorySlug = params.category;

  const POST_PER_PAGE = 4;

  const query = {
    where: { catSlug: categorySlug },
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (Number(page) - 1),
    include: { user: true },
  };

  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query),
      prisma.post.count({ where: { catSlug: categorySlug } }),
    ]);

    return new NextResponse(JSON.stringify({ posts, count, status: 200 }));
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: "Something went wrong!", status: 500 }));
  }
};
