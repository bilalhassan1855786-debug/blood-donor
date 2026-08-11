import connectDB from "@/lib/mongodb";
import Donor from "@/models/Donor";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    await connectDB();

    const token = (await cookies()).get("token")
      ?.value;

    if (!token) {
      return Response.json(
        { success: false },
        { status: 401 }
      );
    }

    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    if (
      decoded.role !== "admin" &&
      decoded.role !== "superadmin"
    ) {
      return Response.json(
        { success: false },
        { status: 403 }
      );
    }

    const { donorId } =
      await req.json();

    await Donor.findByIdAndDelete(
      donorId
    );

    return Response.json({
      success: true,
    });
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}