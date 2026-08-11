import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    await connectDB();

    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;

    if (!token) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    // Only admin or superadmin can access
    if (decoded.role !== "admin" && decoded.role !== "superadmin") {
      return Response.json({ message: "Forbidden" }, { status: 403 });
    }

    const users = await User.find().select("-password");

    return Response.json({
      success: true,
      users,
    });

  } catch (error: any) {
    return Response.json(
      { message: error.message },
      { status: 500 }
    );
  }
}