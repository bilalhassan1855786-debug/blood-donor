import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import BloodRequest from "@/models/BloodRequest";
import { notifyAdmins } from "@/lib/notifications";

// Login required — every request must be tied to a real account so
// there's a data trail, and so requesters become part of the user
// (and eventually donor) pool instead of staying anonymous.
export async function POST(req: Request) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login to submit a blood request.",
        },
        { status: 401 }
      );
    }

    let decoded: { id: string };
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Session expired. Please login again.",
        },
        { status: 401 }
      );
    }

    const {
      patientName,
      relationToPatient,
      contactNumber,
      whatsappNumber,
      bloodGroup,
      unitsNeeded,
      hospital,
      city,
      urgency,
      additionalNotes,
    } = await req.json();

    if (
      !patientName ||
      !contactNumber ||
      !bloodGroup ||
      !hospital ||
      !city
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Required fields are missing",
        },
        { status: 400 }
      );
    }

    const request = await BloodRequest.create({
      requestedBy: decoded.id,
      patientName,
      relationToPatient: relationToPatient || "",
      contactNumber,
      whatsappNumber: whatsappNumber || "",
      bloodGroup,
      unitsNeeded: unitsNeeded || 1,
      hospital,
      city,
      urgency: urgency || "normal",
      additionalNotes: additionalNotes || "",
      status: "pending",
    });

    // Notify every admin/superadmin/developer so they can verify by phone.
    await notifyAdmins({
      type: urgency === "critical" ? "emergency_request" : "blood_request",
      title:
        urgency === "critical"
          ? "🚨 Emergency blood request"
          : "New blood request",
      message: `${patientName} needs ${bloodGroup} blood (${unitsNeeded || 1} unit${
        (unitsNeeded || 1) > 1 ? "s" : ""
      }) at ${hospital}, ${city}.`,
      link: `/admin/blood-requests/${request._id}`,
      metadata: { requestId: request._id.toString() },
    });

    return NextResponse.json({
      success: true,
      message: "Request submitted. Our team will call you shortly to confirm.",
      requestId: request._id,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}