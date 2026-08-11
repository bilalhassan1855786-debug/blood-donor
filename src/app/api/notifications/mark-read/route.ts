import connectDB from "@/lib/mongodb";
import Notification from "@/models/Notification";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    await connectDB();

    const token =
      (await cookies()).get("token")
        ?.value;

    if (!token) {
      return Response.json(
        { success: false },
        { status: 401 }
      );
    }

    const decoded: any =
      jwt.verify(
        token,
        process.env.JWT_SECRET!
      );

    const body =
      await req.json();

    if (body.notificationId) {
      await Notification.findOneAndUpdate(
        {
          _id: body.notificationId,
          userId: decoded.id,
        },
        {
          isRead: true,
        }
      );
    } else {
      await Notification.updateMany(
        {
          userId: decoded.id,
        },
        {
          isRead: true,
        }
      );
    }

    return Response.json({
      success: true,
    });
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}