import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Message from "@/models/Message";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const message = await Message.create(body);

    return NextResponse.json({
      success: true,
      message,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }
}