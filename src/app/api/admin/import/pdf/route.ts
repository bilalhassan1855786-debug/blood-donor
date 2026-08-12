import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { parsePdf } from "@/lib/import/pdf";
import { buildImportPreview } from "@/lib/import/buildPreview";

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
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 });
    }

    const { rawText, rows } =
  await parsePdf(file);

console.log(
  "========== RAW PDF =========="
);

console.log(rawText);

console.log(
  "========== ROWS =========="
);

console.log(rows);

if (!rows.length) {
  return NextResponse.json(
    {
      success: false,

      message:
        "No donor data found.",

      rawTextPreview:
        rawText.slice(0, 1500),
    },
    {
      status: 400,
    }
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
    console.error("PDF IMPORT ERROR:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to process PDF" },
      { status: 500 }
    );
  }
}