import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Message from "@/models/Message";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { id } = await req.json();

    await Message.findByIdAndUpdate(id, {
      status: "read",
    });

    return NextResponse.json({
      success: true,
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