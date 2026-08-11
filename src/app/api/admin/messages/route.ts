import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Message from "@/models/Message";

export async function GET() {
  try {
    await connectDB();

    const messages = await Message.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      messages,
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