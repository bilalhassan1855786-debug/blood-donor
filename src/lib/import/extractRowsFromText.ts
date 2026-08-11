import { ParsedDonorRow } from "./types";

const PHONE_REGEX =
  /(?:\+92|92|0)?3\d{2}[- ]?\d{7}/g;

const BLOOD_REGEX =
  /\b(A\+|A-|B\+|B-|AB\+|AB-|O\+|O-)\b/i;

export function extractRowsFromText(
  text: string
): ParsedDonorRow[] {
  const rows: ParsedDonorRow[] = [];

  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 2);

  for (const line of lines) {
    let current = line;

    const phone =
      current.match(PHONE_REGEX)?.[0] || "";

    if (phone) {
      current = current.replace(phone, "");
    }

    const blood =
      current.match(BLOOD_REGEX)?.[0] || "";

    if (blood) {
      current = current.replace(blood, "");
    }

    current = current
      .replace(/[|]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (
      !phone &&
      !blood &&
      current.length < 3
    ) {
      continue;
    }

    rows.push({
      fullName: current,
      whatsappNumber: phone,
      bloodGroup: blood.toUpperCase(),
    });
  }

  return rows;
}