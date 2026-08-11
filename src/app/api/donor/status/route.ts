import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import Donor from "@/models/Donor";

// Checks whether the logged-in user already has a donor record,
// so the Become Donor form can show "already registered" instead
// of letting them submit a duplicate request.
//
// ⚠️ Assumption: the Donor model has a `userId` field linking back
// to the User account (BecomeDonorPage already sends `userId` in
// its POST body, so this should line up — but please confirm the
// actual field name in your Donor schema matches).
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

    const existingDonor = await Donor.findOne({ userId: decoded.id }).lean();

    return NextResponse.json({
      success: true,
      alreadyRegistered: !!existingDonor,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}