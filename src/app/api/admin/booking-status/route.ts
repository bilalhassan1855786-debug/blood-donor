import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/bookings";
import { createNotification } from "@/lib/createNotification";

export async function POST(req: Request) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    if (
      decoded.role !== "admin" &&
      decoded.role !== "superadmin" &&
      decoded.role !== "developer"
    ) {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    const { bookingId, status } = await req.json();

    if (!bookingId || !status) {
      return NextResponse.json(
        { success: false, message: "bookingId and status are required" },
        { status: 400 }
      );
    }

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    // Notify the requester about the outcome, if this booking is linked
    // to a real account (older bookings submitted before login was
    // required may not have requestedBy set).
    if (booking.requestedBy) {
      if (status === "approved") {
        await createNotification({
          userId: booking.requestedBy.toString(),
          role: "user",
          type: "blood_request",
          title: "Your blood request was verified",
          message:
            "Our team has verified your request and is now working to find a matching donor.",
          link: "/my-requests",
        });
      } else if (status === "cancelled") {
        await createNotification({
          userId: booking.requestedBy.toString(),
          role: "user",
          type: "system",
          title: "Blood request update",
          message: "We couldn't verify your blood request. Please contact our team.",
          link: "/my-requests",
        });
      }
    }

    return NextResponse.json({ success: true, booking });
  } catch (error: any) {
    console.error("BOOKING STATUS ERROR:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}