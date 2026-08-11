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

    const { donorId } =
      await req.json();

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
      "approved";

    donor.approvedBy =
      decoded.id;

    donor.approvedAt =
      new Date();

    donor.rejectionReason =
      "";

    await donor.save();

    // Notify the donor that they've been approved.
    if (donor.userId) {
      await createNotification({
        userId: donor.userId.toString(),
        role: "donor",
        type: "donor_approved",
        title: "Donor profile approved 🎉",
        message:
          "Congratulations! Your donor profile has been approved. You may now be matched with blood requests in your area.",
        link: "/profile",
      });
    }

    return Response.json({
      success: true,
      message:
        "Donor approved successfully",
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