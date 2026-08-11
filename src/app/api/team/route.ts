import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/user";

export async function GET() {
  try {
    await connectDB();

    const team = await User.find({
      role: { $in: ["admin", "superadmin", "developer"] },
    })
      .select(
        "fullName email whatsappNumber localNumber city bloodGroup role photo"
      )
      .sort({ role: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      team,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load team",
      },
      { status: 500 }
    );
  }
}