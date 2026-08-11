import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/user";

export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({
        success: false,
        user: null,
      });
    }

    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    const user = await User.findById(decoded.id).lean();

    if (!user) {
      return NextResponse.json({
        success: false,
        user: null,
      });
    }

   return NextResponse.json({
  success: true,
  user: {
    id: user._id.toString(),
    fullName: user.fullName,
    email: user.email || "",
    whatsappNumber: user.whatsappNumber || "",
    city: user.city || "",
    age: user.age || "",
    weight: user.weight || "",
    cnic: user.cnic || "",
    photo: user.photo || "",
    role: user.role,
  },
});
    
  } catch {
    return NextResponse.json({
      success: false,
      user: null,
    });
  }
}