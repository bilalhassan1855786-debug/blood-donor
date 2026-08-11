import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import { parseExcel } from "@/lib/import/excel";
import { readCSV } from "@/lib/import/readCSV";
import { buildImportPreview } from "@/lib/import/buildPreview";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    if (
      decoded.role !== "admin" &&
      decoded.role !== "superadmin"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden",
        },
        {
          status: 403,
        }
      );
    }

    const formData = await req.formData();

    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "No file uploaded",
        },
        {
          status: 400,
        }
      );
    }

    let rawRows: any[] = [];

    if (file.name.toLowerCase().endsWith(".csv")) {
      const text = await file.text();

      rawRows = readCSV(text);
    } else {
      rawRows = await parseExcel(file);
    }

    if (!rawRows.length) {
      return NextResponse.json(
        {
          success: false,
          message: "File appears to be empty",
        },
        {
          status: 400,
        }
      );
    }

    const { results, counts } =
      await buildImportPreview(rawRows);

    return NextResponse.json({
      success: true,
      fileName: file.name,
      counts,
      rows: results,
    });
  } catch (error: any) {
    console.error(
      "IMPORT PREVIEW ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Failed to parse file",
      },
      {
        status: 500,
      }
    );
  }
}