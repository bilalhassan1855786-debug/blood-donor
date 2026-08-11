import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await cloudinary.uploader.upload(
      body.image,
      {
        folder: "blood-donor/profile",
        resource_type: "image",
        transformation: [
          {
            width: 400,
            height: 400,
            crop: "fill",
            quality: "auto",
            fetch_format: "webp",
          },
        ],
      }
    );

   return NextResponse.json({
  success: true,
  url: result.secure_url,
  publicId: result.public_id,
});
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}