import connectDB from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(req: Request) {
  await connectDB();

  const body = await req.json().catch(() => ({}));
  const id = body.userId || body.id;

  if (!id) {
    return Response.json(
      { success: false, message: "Missing user id" },
      { status: 400 }
    );
  }

  await User.findByIdAndUpdate(id, {
    role: "user",
  });

  return Response.json({ success: true });
}