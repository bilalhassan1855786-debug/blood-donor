import connectDB from "@/lib/mongodb";
import Notification from "@/models/Notification";

export async function createNotification({
  receiverId,
  receiverType,
  type,
  title,
  message,
  link = "",
  icon = "🔔",
  meta = {},
}: any) {
  try {
    await connectDB();

    return await Notification.create({
      receiverId,
      receiverType,
      type,
      title,
      message,
      link,
      icon,
      meta,
    });
  } catch (error) {
    console.error(
      "Notification Error:",
      error
    );
  }
}