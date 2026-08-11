import connectDB from "@/lib/mongodb";
import Donor from "@/models/Donor";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const donor = await Donor.findById(
      params.id
    );

    if (!donor) {
      return Response.json(
        {
          success: false,
          message: "Donor not found",
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      donor,
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