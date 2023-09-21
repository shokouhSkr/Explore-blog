import prisma from "@/helpers/connect";
import { NextRequest, NextResponse } from "next/server";

// Get all emails
export const GET = async (req: NextRequest) => {
  try {
    const [email, count] = await prisma.$transaction([
      prisma.email.findMany(),
      prisma.email.count(),
    ]);

    return new NextResponse(JSON.stringify({ email, count, status: 200 }));
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: "Something went wrong!", status: 500 }));
  }
};

// Post email
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const email = await prisma.$transaction([
      prisma.email.create({
        data: { ...body },
      }),
    ]);

    return new NextResponse(JSON.stringify({ email, status: 201 }));
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: "Something went wrong!", status: 500 }));
  }
};
