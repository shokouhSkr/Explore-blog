import prisma from "@/helpers/connect";
import { NextRequest, NextResponse } from "next/server";

// POST A MESSAGE
export const POST = async (req: NextRequest) => {
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
