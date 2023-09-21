import { getAuthSession } from "@/helpers/auth";
import prisma from "@/helpers/connect";
import { NextRequest, NextResponse } from "next/server";

// POST A MESSAGE
export const POST = async (req: NextRequest) => {
  // const session = await getAuthSession();

  // if (!session) {
  //   return new NextResponse(JSON.stringify({ message: "Not authenticated!", status: 401 }));
  // }

  try {
    const body = await req.json();
    const message = await prisma.message.create({
      data: { ...body },
    });

    return new NextResponse(JSON.stringify({ message, status: 201 }));
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: "Something went wrong!", status: 500 }));
  }
};
