import connectDB from "@/lib/mongodb";
import Notification from "@/models/Notification";
import User from "@/models/user";

// Notification.role enum is ["user","donor","admin","superadmin"] and
// doesn't include "developer" — map it to "admin" so creating a
// notification for a developer account doesn't silently fail.
function normalizeRole(role: string) {
  return role === "developer" ? "admin" : role;
}

export async function createNotification({
  userId,
  role,
  type,
  title,
  message,
  link = "",
  image = "",
  metadata = {},
}: {
  userId: string;
  role: string;
  type: string;
  title: string;
  message: string;
  link?: string;
  image?: string;
  metadata?: any;
}) {
  try {
    await connectDB();

    await Notification.create({
      userId,
      role: normalizeRole(role),
      type,
      title,
      message,
      link,
      image,
      metadata,
    });

    return true;
  } catch (error) {
    console.error("Notification Error:", error);
    return false;
  }
}

// Notifies every admin / superadmin / developer at once — used whenever
// something needs the whole coordination team's attention (new blood
// request, etc). Reuses createNotification so behaviour stays identical.
export async function notifyAdmins({
  type,
  title,
  message,
  link = "",
  image = "",
  metadata = {},
}: {
  type: string;
  title: string;
  message: string;
  link?: string;
  image?: string;
  metadata?: any;
}) {
  await connectDB();

  const admins = await User.find({
    role: { $in: ["admin", "superadmin", "developer"] },
  })
    .select("_id role")
    .lean();

  for (const admin of admins) {
    await createNotification({
      userId: admin._id.toString(),
      role: admin.role,
      type,
      title,
      message,
      link,
      image,
      metadata,
    });
  }
}