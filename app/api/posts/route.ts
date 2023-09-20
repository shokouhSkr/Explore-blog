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

// Create a post
export const POST = async (req: NextRequest) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(JSON.stringify({ message: "Not authenticated!", status: 401 }));
  }

  try {
    const body = await req.json();
    const post = await prisma.post.create({
      data: { ...body, userEmail: session.user?.email },
    });

    return new NextResponse(JSON.stringify({ post, status: 201 }));
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: "Something went wrong!", status: 500 }));
  }
};
