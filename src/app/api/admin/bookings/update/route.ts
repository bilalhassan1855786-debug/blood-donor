import connectDB from "@/lib/mongodb";
import Booking from "@/models/bookings";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { bookingId, status } =
      await req.json();

    await Booking.findByIdAndUpdate(
      bookingId,
      { status }
    );

    return Response.json({
      success: true,
    });
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}