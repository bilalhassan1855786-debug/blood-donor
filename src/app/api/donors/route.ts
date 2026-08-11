import connectDB from "@/lib/mongodb";
import Donor from "@/models/Donor";
import User from "@/models/user";
import { createNotification } from "@/lib/createNotification";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    // Required fields
    if (
      !body.userId ||
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
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    // Health check verification
    if (!body.healthChecked) {
      return Response.json(
        {
          success: false,
          message:
            "Please complete health check first",
        },
        { status: 400 }
      );
    }

    // Terms verification
    if (!body.termsAccepted) {
      return Response.json(
        {
          success: false,
          message:
            "Please accept terms and conditions",
        },
        { status: 400 }
      );
    }

    // Already donor?
    const existingDonor =
      await Donor.findOne({
        userId: body.userId,
      });

    if (existingDonor) {
      return Response.json(
        {
          success: false,
          message:
            "You already submitted donor application",
        },
        { status: 400 }
      );
    }

    const donor = await Donor.create({
      // User
      userId: body.userId,

      // Basic
      fullName: body.fullName,
      fatherName: body.fatherName,

      email: body.email || "",

      whatsappNumber:
        body.whatsappNumber,

      localNumber:
        body.localNumber || "",

      age: body.age || null,

      weight:
        body.weight || null,

      cnic:
        body.cnic || "",

      // Blood
      bloodGroup:
        body.bloodGroup,

      // Address
      city: body.city,

      presentAddress:
        body.presentAddress,

      permanentAddress:
        body.permanentAddress,

      // Optional Map Location
      latitude:
        body.latitude || null,

      longitude:
        body.longitude || null,

      locationAddress:
        body.locationAddress || "",

      // Photo
      photo:
        body.photo || "",

      photoPublicId:
        body.photoPublicId || "",

      // Donation
      lastDonationDate:
        body.lastDonationDate ||
        null,

      // Availability
      availabilityStatus:
        body.availabilityStatus ||
        "available",

      // Transport
      transportSupport:
        body.transportSupport ||
        "no",

      // Bio
      bio:
        body.bio || "",

      // Health
      healthChecked: true,

      healthCheckedAt:
        new Date(),

      // Terms
      termsAccepted: true,

      termsAcceptedAt:
        new Date(),

      // Approval
      status: "pending",

      // Statistics
      totalDonations: 0,
    });
    const admins = await User.find({
  role: {
    $in: ["admin", "superadmin"],
  },
});

for (const admin of admins) {
  await createNotification({
    userId: admin._id.toString(),

    role: admin.role,

    type: "donor_request",

    title:
      "New Donor Application",

    message:
      `${body.fullName} submitted a donor application.`,

    link: "/admin/donors",

    metadata: {
      donorId: donor._id,
    },
  });
}

    return Response.json({
      success: true,
      message:
        "Donor application submitted successfully",
      donor,
    });
  } catch (error: any) {
    console.error(
      "DONOR CREATE ERROR:",
      error
    );

    return Response.json(
      {
        success: false,
        message:
          error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const donors =
      await Donor.find()
        .populate(
          "approvedBy",
          "fullName"
        )
        .sort({
          createdAt: -1,
        });

    return Response.json({
      success: true,
      donors,
    });
  } catch (error: any) {
    console.error(
      "DONOR FETCH ERROR:",
      error
    );

    return Response.json(
      {
        success: false,
        message:
          error.message,
      },
      {
        status: 500,
      }
    );
  }
}