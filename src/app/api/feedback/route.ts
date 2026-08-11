import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import Feedback from "@/models/Feedback";
import User from "@/models/user";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { sentiment, comment, routedToStore } = body;

    if (sentiment !== "positive" && sentiment !== "negative") {
      return NextResponse.json(
        { success: false, message: "Invalid feedback" },
        { status: 400 }
      );
    }

    // Attach the logged-in user if there is a session — feedback still
    // works fine for logged-out visitors, this is best-effort only.
    let userId = null;
    let fullName = "";

    try {
      const cookieStore = await cookies();
      const token = cookieStore.get("token")?.value;

      if (token) {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        const user = await User.findById(decoded.id).select("fullName").lean();

        if (user) {
          userId = decoded.id;
          fullName = (user as any).fullName || "";
        }
      }
    } catch {
      // Not logged in / bad token — feedback is still saved anonymously.
    }

    await Feedback.create({
      userId,
      fullName,
      sentiment,
      comment: comment || "",
      routedToStore: !!routedToStore,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: "Failed to save feedback" },
      { status: 500 }
    );
  }
}