import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import ImportHistory from "@/models/ImportHistory";
import Donor from "@/models/Donor";

export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    if (decoded.role !== "admin" && decoded.role !== "superadmin") {
      return NextResponse.json({ success: false }, { status: 403 });
    }

    // Undone imports are excluded — their donors/accounts no longer exist.
    const activeHistory = await ImportHistory.find({ undone: { $ne: true } })
      .sort({ createdAt: -1 })
      .lean();

    const totalImports = activeHistory.length;

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const todayImports = activeHistory
      .filter((h: any) => new Date(h.createdAt) >= startOfToday)
      .reduce((sum: number, h: any) => sum + (h.imported || 0), 0);

    const lastImport = activeHistory[0]
      ? {
          fileName: activeHistory[0].fileName,
          imported: activeHistory[0].imported,
          createdAt: activeHistory[0].createdAt,
        }
      : null;

    const allDonorIds = activeHistory.flatMap((h: any) => h.insertedDonorIds || []);

    const [topCitiesAgg, topBloodGroupsAgg] = await Promise.all([
      Donor.aggregate([
        { $match: { _id: { $in: allDonorIds }, city: { $ne: "" } } },
        { $group: { _id: "$city", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
      ]),
      Donor.aggregate([
        { $match: { _id: { $in: allDonorIds } } },
        { $group: { _id: "$bloodGroup", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 8 },
      ]),
    ]);

    return NextResponse.json({
      success: true,
      totalImports,
      todayImports,
      lastImport,
      totalImportedDonors: allDonorIds.length,
      topCities: topCitiesAgg.map((c: any) => ({ city: c._id, count: c.count })),
      topBloodGroups: topBloodGroupsAgg.map((b: any) => ({ bloodGroup: b._id, count: b.count })),
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}