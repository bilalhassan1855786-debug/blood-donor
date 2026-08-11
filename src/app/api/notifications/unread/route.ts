import connectDB from "@/lib/mongodb";
import Notification from "@/models/Notification";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    await connectDB();

    const token =
      (await cookies()).get("token")
        ?.value;

    if (!token) {
      return Response.json({
        count: 0,
      });
    }

    const decoded: any =
      jwt.verify(
        token,
        process.env.JWT_SECRET!
      );

    const count =
      await Notification.countDocuments(
        {
          userId: decoded.id,
          isRead: false,
        }
      );

    return Response.json({
      count,
    });
  } catch {
    return Response.json({
      count: 0,
    });
  }
}