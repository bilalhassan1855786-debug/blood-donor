import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    await connectDB();

    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    // ONLY SUPER ADMIN CAN DEMOTE
    if (decoded.role !== "superadmin") {
      return Response.json({ message: "Forbidden" }, { status: 403 });
    }

    const { userId } = await req.json();

    const user = await User.findById(userId);

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    // Prevent demoting superadmin
    if (user.role === "superadmin") {
      return Response.json({
        message: "Cannot demote superadmin"
      }, { status: 400 });
    }

    user.role = "user";
    await user.save();

    return Response.json({
      success: true,
      message: "User demoted to normal user"
    });

  } catch (error: any) {
    return Response.json(
      { message: error.message },
      { status: 500 }
    );
  }
}