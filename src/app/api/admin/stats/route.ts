import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import Donor from "@/models/Donor";
import Booking from "@/models/bookings";

export async function GET() {
  await connectDB();

  const totalUsers = await User.countDocuments();
  const totalDonors = await Donor.countDocuments();
  const totalBookings = await Booking.countDocuments();
  const pendingBookings = await Booking.countDocuments({
    status: "pending",
  });

  return Response.json({
    totalUsers,
    totalDonors,
    totalBookings,
    pendingBookings,
  });
}