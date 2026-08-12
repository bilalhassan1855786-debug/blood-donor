import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.image) {
      return NextResponse.json(
        {
          success: false,
          message: "No image provided",
        },
        { status: 400 }
      );
    }

    const result = await cloudinary.uploader.upload(body.image, {
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
    });

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error: any) {
    console.error("Cloudinary upload error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Image upload failed",
      },
      { status: 500 }
    );
  }
}