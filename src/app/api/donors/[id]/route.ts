import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Donor from "@/models/Donor";

export async function DELETE(
  request: NextRequest,
  { params }: any
) {
  try {
    await connectDB();

    await Donor.findByIdAndDelete(params.id);

    return NextResponse.json({
      success: true,
      message: "Donor Deleted Successfully",
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}

export async function GET(
  request: NextRequest,
  { params }: any
) {
  try {
    await connectDB();

    const donor = await Donor.findById(params.id);

    return NextResponse.json({
      success: true,
      donor,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
}
    );  }
}   