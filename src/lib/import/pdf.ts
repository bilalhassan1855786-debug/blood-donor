import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

import { extractRowsFromText } from "./extractRowsFromText";

import { ParsedDonorRow } from "./types";

export async function parsePdf(
  file: File
): Promise<{
  rawText: string;
  rows: ParsedDonorRow[];
}> {
  const buffer =
    await file.arrayBuffer();

  const pdf =
    await pdfjsLib.getDocument({
      data: buffer,
    }).promise;

  let rawText = "";

  for (
    let i = 1;
    i <= pdf.numPages;
    i++
  ) {
    const page =
      await pdf.getPage(i);

    const content =
      await page.getTextContent();

    let pageText = "";

    for (const item of content.items as any[]) {
      pageText +=
        item.str + "\n";
    }

    rawText +=
      pageText + "\n";
  }

  const rows =
    extractRowsFromText(
      rawText
    );

  return {
    rawText,
    rows,
  };
}