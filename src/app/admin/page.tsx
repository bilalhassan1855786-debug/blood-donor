import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import Donor from "@/models/Donor";
import Booking from "@/models/bookings";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import AdminDashboardClient from "@/components/admin/AdminDashboardClient";

type JwtUser = {
  id: string;
  role: "user" | "admin" | "superadmin";
};

// This stays a Server Component so DB access never touches the client.
// All translation-aware rendering happens in AdminDashboardClient below,
// since useLanguage() (React Context) only works in Client Components.
export default async function AdminPage() {
  await connectDB();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) redirect("/login");

  let user: JwtUser;

  try {
    user = jwt.verify(token, process.env.JWT_SECRET!) as JwtUser;
  } catch {
    redirect("/login");
  }

  if (user.role !== "admin" && user.role !== "superadmin") {
    redirect("/login");
  }

  const [
    totalUsers,
    totalDonors,
    totalRequests,
    pendingRequests,
    approvedRequests,
    recentRequests,
    recentDonors,
  ] = await Promise.all([
    User.countDocuments(),
    Donor.countDocuments(),
    Booking.countDocuments(),
    Booking.countDocuments({ status: "pending" }),
    Booking.countDocuments({ status: "approved" }),
    Booking.find().sort({ createdAt: -1 }).limit(5).lean(),
    Donor.find().sort({ createdAt: -1 }).limit(5).lean(),
  ]);

  return (
    <AdminDashboardClient
      stats={{
        totalUsers,
        totalDonors,
        totalRequests,
        pendingRequests,
        approvedRequests,
      }}
      recentRequests={JSON.parse(JSON.stringify(recentRequests))}
      recentDonors={JSON.parse(JSON.stringify(recentDonors))}
    />
  );
}