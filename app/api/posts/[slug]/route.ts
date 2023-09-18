import prisma from "@/helpers/connect";
import { NextRequest, NextResponse } from "next/server";

// Get single post
export const GET = async (req: NextRequest, { params }: { params: { slug: string } }) => {
  const { slug } = params;

  try {
    const post = await prisma.post.findUnique({
      where: {
        slug,
      },
      include: { user: true },
    });

    return new NextResponse(JSON.stringify({ post, status: 200 }));
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: "Something went wrong!", status: 500 }));
  }
};
