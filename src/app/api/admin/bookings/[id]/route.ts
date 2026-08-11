import connectDB from "@/lib/mongodb";
import Booking from "@/models/bookings";

export async function PATCH(
  req: Request,
  { params }: any
) {
  await connectDB();

  const body = await req.json();

  const booking = await Booking.findByIdAndUpdate(
    params.id,
    {
      status: body.status,
    },
    { new: true }
  );

  return Response.json({
    success: true,
    booking,
  });
}

export async function DELETE(
  req: Request,
  { params }: any
) {
  await connectDB();

  await Booking.findByIdAndDelete(
    params.id
  );

  return Response.json({
    success: true,
  });
}