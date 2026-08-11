import connectDB from "@/lib/mongodb";
import Notification from "@/models/Notification";

export async function POST(
  req: Request
) {
  try {
    await connectDB();

    const { id } =
      await req.json();

    await Notification.findByIdAndUpdate(
      id,
      {
        isRead: true,
      }
    );

    return Response.json({
      success: true,
    });
  } catch {
    return Response.json({
      success: false,
    });
  }
}