import connectDB from "@/lib/mongodb";
import Donor from "@/models/Donor";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { createNotification } from "@/lib/createNotification";

export async function POST(req: Request) {
  try {
    await connectDB();

    const token =
      (await cookies()).get("token")
        ?.value;

    if (!token) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const decoded: any =
      jwt.verify(
        token,
        process.env.JWT_SECRET!
      );

    if (
      decoded.role !== "admin" &&
      decoded.role !==
        "superadmin"
    ) {
      return Response.json(
        {
          success: false,
          message: "Forbidden",
        },
        { status: 403 }
      );
    }

    const {
      donorId,
      reason,
    } = await req.json();

    const donor =
      await Donor.findById(
        donorId
      );

    if (!donor) {
      return Response.json(
        {
          success: false,
          message:
            "Donor not found",
        },
        { status: 404 }
      );
    }

    donor.status =
      "rejected";

    donor.rejectionReason =
      reason ||
      "No reason provided";

    donor.approvedBy =
      null;

    donor.approvedAt =
      null;

    await donor.save();

    // Notify the donor that their application was rejected.
    if (donor.userId) {
      await createNotification({
        userId: donor.userId.toString(),
        role: "user",
        type: "donor_rejected",
        title: "Donor profile update",
        message: reason
          ? `Your donor application was rejected: ${reason}`
          : "Your donor application was rejected. Please contact our team for details.",
        link: "/profile",
      });
    }

    return Response.json({
      success: true,
      message:
        "Donor rejected successfully",
    });
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message:
          error.message,
      },
      { status: 500 }
    );
  }
}