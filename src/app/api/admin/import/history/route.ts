import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import ImportHistory from "@/models/ImportHistory";

export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ success: false, history: [] }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    if (decoded.role !== "admin" && decoded.role !== "superadmin") {
      return NextResponse.json({ success: false, history: [] }, { status: 403 });
    }

    const history = await ImportHistory.find()
      .populate("importedBy", "fullName")
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    return NextResponse.json({ success: true, history });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message, history: [] },
      { status: 500 }
    );
  }
}