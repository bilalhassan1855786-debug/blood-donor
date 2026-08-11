import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/bookings";
import { notifyAdmins } from "@/lib/createNotification";

export async function POST(req: Request) {
  try {
    await connectDB();

    // Login required — every request must be tied to a real account so
    // "My Requests" can show it back to the person who submitted it,
    // and so there's accountability (no anonymous requests).
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Please login to submit a blood request." },
        { status: 401 }
      );
    }

    let decoded: { id: string };
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    } catch {
      return NextResponse.json(
        { success: false, message: "Session expired. Please login again." },
        { status: 401 }
      );
    }

    const body = await req.json();

    if (
      !body.requesterName ||
      !body.patientName ||
      !body.gender ||
      !body.disease ||
      !body.bloodGroup ||
      !body.hospital ||
      !body.location ||
      !body.city ||
      !body.contactNumber ||
      !body.dateNeeded
    ) {
      return NextResponse.json(
        { success: false, message: "Please fill all required fields" },
        { status: 400 }
      );
    }

    const booking = await Booking.create({
      requestedBy: decoded.id,

      requesterName: body.requesterName,
      patientName: body.patientName,
      patientage: body.patientage || null,
      gender: body.gender,
      disease: body.disease,
      bloodGroup: body.bloodGroup,
      bloodUnits: Number(body.bloodUnits) || 1,
      patientHb: body.patientHb || "",
      hospital: body.hospital,
      location: body.location,
      city: body.city,
      latitude: body.latitude ? Number(body.latitude) : null,
      longitude: body.longitude ? Number(body.longitude) : null,
      contactNumber: body.contactNumber,
      dateNeeded: new Date(body.dateNeeded),
      urgency: body.urgency || "Normal",
      canProvideTransport: body.canProvideTransport || "no",
      notes: body.notes || "",
      status: "pending",
    });

    // Notify admins so they can verify by phone.
    await notifyAdmins({
      type: booking.urgency === "Critical" ? "emergency_request" : "blood_request",
      title:
        booking.urgency === "Critical"
          ? "🚨 Emergency blood request"
          : "New blood request",
      message: `${booking.patientName} needs ${booking.bloodGroup} blood (${booking.bloodUnits} unit${
        booking.bloodUnits > 1 ? "s" : ""
      }) at ${booking.hospital}, ${booking.city}.`,
      link: `/admin/bookings/${booking._id}`,
      metadata: { bookingId: booking._id.toString() },
    });

    return NextResponse.json({
      success: true,
      message: "Blood request submitted successfully",
      booking,
    });
  } catch (error: any) {
    console.error("Booking Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Booking failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const bookings = await Booking.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, bookings });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}