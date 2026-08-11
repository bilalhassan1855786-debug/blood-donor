import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import ImportHistory from "@/models/ImportHistory";
import User from "@/models/user";
import Donor from "@/models/Donor";

export async function POST(req: Request) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    if (decoded.role !== "admin" && decoded.role !== "superadmin") {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
    }

    const { importHistoryId } = await req.json();

    const history = await ImportHistory.findById(importHistoryId);

    if (!history) {
      return NextResponse.json(
        { success: false, message: "Import record not found" },
        { status: 404 }
      );
    }

    if (history.undone) {
      return NextResponse.json(
        { success: false, message: "This import was already undone" },
        { status: 400 }
      );
    }

    await Donor.deleteMany({ _id: { $in: history.insertedDonorIds } });
    await User.deleteMany({ _id: { $in: history.insertedUserIds } });

    history.undone = true;
    await history.save();

    return NextResponse.json({
      success: true,
      message: "Import undone — the donors and accounts it created have been removed.",
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}