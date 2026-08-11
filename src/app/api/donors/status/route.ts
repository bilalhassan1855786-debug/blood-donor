import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import Donor from "@/models/Donor";

// Checks whether the logged-in user already has a donor record, and
// returns its status (pending/approved/rejected) so pages like
// BecomeDonorPage and MyRequestsPage can both use this one endpoint.
export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Not logged in" },
        { status: 401 }
      );
    }

    let decoded: { id: string };
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    } catch {
      return NextResponse.json(
        { success: false, message: "Session expired" },
        { status: 401 }
      );
    }

    const existingDonor = await Donor.findOne({ userId: decoded.id })
      .select("status rejectionReason bloodGroup city createdAt")
      .lean();

    return NextResponse.json({
      success: true,
      alreadyRegistered: !!existingDonor,
      donor: existingDonor || null,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}