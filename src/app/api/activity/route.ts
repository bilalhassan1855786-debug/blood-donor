import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import BloodRequest from "@/models/BloodRequest";
import Donor from "@/models/Donor";

// Public, anonymized activity feed — no names, numbers, or exact
// addresses, ever. Only shows requests that are past "pending" (i.e.
// already phone-verified by the team) so nothing unconfirmed appears
// publicly, plus newly approved donors.
export async function GET() {
  try {
    await connectDB();

    const requests = await BloodRequest.find({
      status: { $in: ["verified", "fulfilled"] },
    })
      .select("bloodGroup city status updatedAt")
      .sort({ updatedAt: -1 })
      .limit(15)
      .lean();

    const donors = await Donor.find({ status: "approved" })
      .select("bloodGroup city updatedAt")
      .sort({ updatedAt: -1 })
      .limit(15)
      .lean();

    const activity = [
      ...requests.map((r: any) => ({
        id: r._id.toString(),
        kind: r.status === "fulfilled" ? "request_fulfilled" : "request_verified",
        bloodGroup: r.bloodGroup,
        city: r.city,
        timestamp: r.updatedAt,
      })),
      ...donors.map((d: any) => ({
        id: d._id.toString(),
        kind: "donor_approved",
        bloodGroup: d.bloodGroup,
        city: d.city,
        timestamp: d.updatedAt,
      })),
    ]
      .sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
      .slice(0, 20);

    return NextResponse.json({ success: true, activity });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message, activity: [] },
      { status: 500 }
    );
  }
}