import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id");

  await User.findByIdAndDelete(id);

  return NextResponse.redirect(
    new URL("/admin/users", req.url)
  );
}