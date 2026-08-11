import connectDB from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(req: Request) {
  await connectDB();

  const body = await req.json().catch(() => ({}));
  const id = body.userId || body.id;
  const role = body.role === "developer" ? "developer" : "admin";

  if (!id) {
    return Response.json(
      { success: false, message: "Missing user id" },
      { status: 400 }
    );
  }

  await User.findByIdAndUpdate(id, {
    role,
  });

  return Response.json({ success: true });
}