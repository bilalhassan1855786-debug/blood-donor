import connectDB from "@/lib/mongodb";
import Donor from "@/models/Donor";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized",
        },
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
        {
          success: false,
          message: "Forbidden",
        },
        { status: 403 }
      );
    }

    const body = await req.json();

    const donor = await Donor.findByIdAndUpdate(
      params.id,
      {
        fullName: body.fullName,
        fatherName: body.fatherName,

        email: body.email || "",

        bloodGroup: body.bloodGroup,

        whatsappNumber:
          body.whatsappNumber,

        localNumber:
          body.localNumber || "",

        age: body.age || null,

        cnic: body.cnic || "",

        city: body.city,

        presentAddress:
          body.presentAddress,

        permanentAddress:
          body.permanentAddress,

        lastDonationDate:
          body.lastDonationDate || null,

        availabilityStatus:
          body.availabilityStatus ||
          "available",

        transportSupport:
          body.transportSupport ||
          "no",

        bio:
          body.bio || "",

        healthChecked:
          body.healthChecked ?? true,

        termsAccepted:
          body.termsAccepted ?? true,

        totalDonations:
          body.totalDonations || 0,

        status:
          body.status || "approved",

        rejectionReason:
          body.rejectionReason || "",
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!donor) {
      return Response.json(
        {
          success: false,
          message: "Donor not found",
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      donor,
    });
  } catch (error: any) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}