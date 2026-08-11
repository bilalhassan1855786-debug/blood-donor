import Donor from "@/models/Donor";
import connectDB from "@/lib/mongodb";
import { isAvailable } from "@/lib/donorUtils";

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);

  const bloodGroup = searchParams.get("bloodGroup");
  const city = searchParams.get("city");

  const donors = await Donor.find({
    ...(bloodGroup && { bloodGroup }),
    ...(city && { city }),
  });

  const availableDonors = donors.filter((d) =>
    isAvailable(d.lastDonationDate)
  );

  return Response.json({ donors: availableDonors });
}