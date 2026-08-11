import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/user";

const DEFAULT_PASSWORD = "123456";

export async function POST(req: Request) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    if (decoded.role !== "admin" && decoded.role !== "superadmin") {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
    }

    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "userId is required" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, 10);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        password: hashedPassword,
        mustChangePassword: true,
      },
      { new: true }
    ).select("fullName");

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Password reset to ${DEFAULT_PASSWORD}. ${updatedUser.fullName} will be asked to change it on next login.`,
    });
  } catch (error: any) {
    console.error("RESET PASSWORD ERROR:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}