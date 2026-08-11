import connectDB from "@/lib/mongodb";
import Notification from "@/models/Notification";
import User from "@/models/user";

type NotificationType =
  | "donor_request"
  | "donor_approved"
  | "donor_rejected"
  | "blood_request"
  | "emergency_request"
  | "donation_completed"
  | "achievement"
  | "announcement"
  | "system";

type NotificationRole = "user" | "donor" | "admin" | "superadmin";

// Notification.role enum doesn't include "developer" — map it to "admin"
// so creating a notification for a developer account doesn't fail validation.
function toNotificationRole(role: string): NotificationRole {
  if (role === "developer") return "admin";
  return role as NotificationRole;
}

// Notify a single user.
export async function notifyUser({
  userId,
  role,
  type,
  title,
  message,
  link = "",
  metadata = {},
}: {
  userId: string;
  role: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
  metadata?: Record<string, any>;
}) {
  await connectDB();

  await Notification.create({
    userId,
    role: toNotificationRole(role),
    type,
    title,
    message,
    link,
    metadata,
  });
}

// Notify every admin / superadmin / developer account at once —
// used when a new donor request or blood request comes in.
export async function notifyAdmins({
  type,
  title,
  message,
  link = "",
  metadata = {},
}: {
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
  metadata?: Record<string, any>;
}) {
  await connectDB();

  const admins = await User.find({
    role: { $in: ["admin", "superadmin", "developer"] },
  })
    .select("_id role")
    .lean();

  if (admins.length === 0) return;

  await Notification.insertMany(
    admins.map((admin: any) => ({
      userId: admin._id,
      role: toNotificationRole(admin.role),
      type,
      title,
      message,
      link,
      metadata,
    }))
  );
}