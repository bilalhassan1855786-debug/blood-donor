import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/bookings";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const booking = await Booking.findById(id).lean();

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          message: "Request not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}