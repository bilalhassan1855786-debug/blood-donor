import * as XLSX from "xlsx";
import { ParsedDonorRow } from "./types";
import { mapExcelRow } from "./mapExcelRow";

export async function parseExcel(file: File) {
  const buffer = await file.arrayBuffer();

  const workbook = XLSX.read(buffer, {
    type: "array",
  });

  const sheet =
    workbook.Sheets[
      workbook.SheetNames[0]
    ];

  const json = XLSX.utils.sheet_to_json<
    Record<string, any>
  >(sheet, {
    defval: "",
  });

  const rows: ParsedDonorRow[] = [];

  for (const row of json) {
    const mapped =
      mapExcelRow(row);

    if (
      !mapped.fullName &&
      !mapped.whatsappNumber &&
      !mapped.bloodGroup
    ) {
      continue;
    }

    rows.push(mapped);
  }

  return rows;
}