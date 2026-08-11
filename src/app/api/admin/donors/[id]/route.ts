import connectDB from "@/lib/mongodb";
import Donor from "@/models/Donor";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params;

  await Donor.findByIdAndDelete(id);

  return Response.json({
    success: true,
  });
}