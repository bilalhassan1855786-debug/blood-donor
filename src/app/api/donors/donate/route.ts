
import Donor from "@/models/Donor";

export async function POST(req: Request) {
  const session = await getServerSession();

  if (!session || session.user.role !== "admin") {
    return Response.json({ success: false, message: "Forbidden" });
  }

  const { id } = await req.json();

  await Donor.findByIdAndUpdate(id, {
    lastDonationDate: new Date(),
  });

  return Response.json({ success: true });
}