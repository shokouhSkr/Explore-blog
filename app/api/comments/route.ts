import { getAuthSession } from "@/helpers/auth";
import prisma from "@/helpers/connect";
import { NextRequest, NextResponse } from "next/server";

// Get all comments from a post
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const postSlug = searchParams.get("postSlug");

  try {
    const comments = await prisma.comment.findMany({
      where: {
        ...(postSlug && { postSlug }),
      },
      include: {
        user: true,
      },
    });

    return new NextResponse(JSON.stringify({ comments, status: 200 }));
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: "Something went wrong!", status: 500 }));
  }
};

// Create a comment on a post
export const POST = async (req: NextRequest) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(JSON.stringify({ message: "Not authenticated!", status: 401 }));
  }

  try {
    const body = await req.json();
    const comment = await prisma.comment.create({
      data: { ...body, userEmail: session.user?.email },
    });

    return new NextResponse(JSON.stringify({ comment, status: 200 }));
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: "Something went wrong!", status: 500 }));
  }
};
