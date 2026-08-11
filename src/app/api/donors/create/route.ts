import connectDB from "@/lib/mongodb";
import Donor from "@/models/Donor";

export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();

  const donor = await Donor.create({
    fullName: body.fullName,
    bloodGroup: body.bloodGroup,
    city: body.city,
    address: body.address,
    whatsappNumber: body.whatsappNumber,
    available: true,
  });

  return Response.json({ success: true, donor });
}