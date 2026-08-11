import connectDB from "@/lib/mongodb";
import Donor from "@/models/Donor";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(
  req: Request
) {
  try {
    await connectDB();

    const token =
      (await cookies()).get(
        "token"
      )?.value;

    if (!token) {
      return Response.json(
        {
          success: false,
          message:
            "Unauthorized",
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
          message:
            "Forbidden",
        },
        { status: 403 }
      );
    }

    const body =
      await req.json();

    if (
      !body.fullName ||
      !body.fatherName ||
      !body.bloodGroup ||
      !body.whatsappNumber ||
      !body.city ||
      !body.presentAddress ||
      !body.permanentAddress
    ) {
      return Response.json(
        {
          success: false,
          message:
            "Missing required fields",
        },
        { status: 400 }
      );
    }

    const donor =
      await Donor.create({
        userId:
          body.userId ||
          undefined,

        fullName:
          body.fullName,

        fatherName:
          body.fatherName,

        email:
          body.email || "",

        whatsappNumber:
          body.whatsappNumber,

        localNumber:
          body.localNumber ||
          "",

        age:
          body.age || null,

        weight:
          body.weight ||
          null,

        cnic:
          body.cnic || "",

        bloodGroup:
          body.bloodGroup,

        city:
          body.city,

        presentAddress:
          body.presentAddress,

        permanentAddress:
          body.permanentAddress,

        latitude:
          body.latitude ||
          null,

        longitude:
          body.longitude ||
          null,

        locationAddress:
          body.locationAddress ||
          "",

        photo:
          body.photo || "",

        photoPublicId:
          body.photoPublicId ||
          "",

        lastDonationDate:
          body.lastDonationDate ||
          null,

        availabilityStatus:
          body.availabilityStatus ||
          "available",

        transportSupport:
          body.transportSupport ||
          "no",

        bio:
          body.bio || "",

        healthChecked:
          body.healthChecked ??
          true,

        healthCheckedAt:
          new Date(),

        termsAccepted:
          body.termsAccepted ??
          true,

        termsAcceptedAt:
          new Date(),

        totalDonations:
          body.totalDonations ||
          0,

        status:
          "approved",

        approvedBy:
          decoded.id,

        approvedAt:
          new Date(),
      });

    return Response.json({
      success: true,
      donor,
    });
  } catch (error: any) {
    console.error(
      error
    );

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