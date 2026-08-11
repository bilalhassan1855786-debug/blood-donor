import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/user";

export async function GET() {
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

    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    const user = await User.findById(decoded.id).lean();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: JSON.parse(JSON.stringify(user)),
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

export async function PUT(req: Request) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false },
        { status: 401 }
      );
    }

    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    const body = await req.json();

   const updatedUser =
  await User.findByIdAndUpdate(
    decoded.id,
    {
      fullName: body.fullName,
      fatherName: body.fatherName,
gender: body.gender,
age: body.age,
weight: body.weight,

      whatsappNumber: body.whatsappNumber,
      localNumber: body.localNumber,
      bloodGroup: body.bloodGroup,
      city: body.city,
      presentAddress: body.presentAddress,
      permanentAddress: body.permanentAddress,
      cnic: body.cnic,
      lastDonationDate: body.lastDonationDate,
      availabilityStatus: body.availabilityStatus,
      totalDonations: body.totalDonations,
     photo: body.photo,
photoPublicId: body.photoPublicId,
      dateOfBirth: body.dateOfBirth,
      
      bio: body.bio,
    isEligible:
      body.age >= 18 &&
      body.age <= 60 &&
      body.weight >= 50,
  },
  { new: true }
);

    return NextResponse.json({
      success: true,
      user: updatedUser,
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