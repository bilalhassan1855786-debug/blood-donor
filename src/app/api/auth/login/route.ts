import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { identifier, password } = await req.json();

    if (!identifier || !password) {
      return Response.json(
        { success: false, message: "Email/Phone and Password required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      $or: [
        { email: identifier },
        { whatsappNumber: identifier },
        { localNumber: identifier },
        { phone: identifier }, // old users support
      ],
    });

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return Response.json(
        { success: false, message: "Invalid password" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "30d" }
    );

    const cookieStore = await cookies();

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return Response.json({
      success: true,
      role: user.role,
      // Frontend should check this and redirect to the change-password
      // page if true — e.g. after an admin resets someone's password,
      // or after a bulk-imported donor logs in for the first time.
      mustChangePassword: !!user.mustChangePassword,
      user: {
        id: user._id,
        role: user.role,
        email: user.email,
      },
    });
  } catch (error: any) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}