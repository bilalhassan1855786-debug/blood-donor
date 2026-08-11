import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/bookings";

export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, bookings: [] },
        { status: 401 }
      );
    }

    let decoded: { id: string };
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    } catch {
      return NextResponse.json(
        { success: false, bookings: [] },
        { status: 401 }
      );
    }

    const bookings = await Booking.find({ requestedBy: decoded.id })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, bookings });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message, bookings: [] },
      { status: 500 }
    );
  }
}