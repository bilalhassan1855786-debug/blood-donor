import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { ocrExtractRows } from "@/lib/import/ocr";
import { buildImportPreview } from "@/lib/import/buildPreview";
import { validateImage } from "@/lib/import/imageValidator";
// PREVIEW ONLY — runs OCR on the uploaded photo and returns extracted
// rows for review, same shape as the Excel preview so it can reuse
// the same ImportPreview UI. Nothing is written to the DB here.
export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    if (decoded.role !== "admin" && decoded.role !== "superadmin") {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
    }

    const formData = await req.formData();
    const file =
formData.get("file") as File;
validateImage(file);
    if (!file) {
      return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const { rawText, rows } = await ocrExtractRows(buffer);

    if (rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Couldn't detect any donor rows in this image. Try a clearer, well-lit photo.",
        },
        { status: 400 }
      );
    }

    const { results, counts } = await buildImportPreview(rows);

    return NextResponse.json({
      success: true,
      fileName: file.name,
      counts,
      rows: results,
      rawTextPreview: rawText.slice(0, 800),
    });
  } catch (error: any) {
    console.error("IMAGE IMPORT ERROR:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to process image" },
      { status: 500 }
    );
  }
}