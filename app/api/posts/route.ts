import { getAuthSession } from "@/helpers/auth";
import prisma from "@/helpers/connect";
import { NextRequest, NextResponse } from "next/server";

// Get all posts
export const GET = async (req: NextRequest) => {
  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany({
        include: { user: true, translation: true },
      }),
      prisma.post.count(),
    ]);

    return new NextResponse(JSON.stringify({ posts, count, status: 200 }));
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: "Something went wrong!", status: 500 }));
  }
};
