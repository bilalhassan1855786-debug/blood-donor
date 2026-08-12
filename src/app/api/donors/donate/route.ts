import connectDB from "@/lib/mongodb";
import Donor from "@/models/Donor";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    await connectDB();

    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    if (decoded.role !== "admin" && decoded.role !== "superadmin") {
      return Response.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    const { id } = await req.json();

    await Donor.findByIdAndUpdate(id, {
      lastDonationDate: new Date(),
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}