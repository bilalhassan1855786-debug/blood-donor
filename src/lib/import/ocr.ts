import Tesseract from "tesseract.js";
import { extractRowsFromText } from "./extractRowsFromText";
import { ParsedDonorRow } from "./types";

export async function ocrExtractRows(
  buffer: Buffer
): Promise<{
  rawText: string;
  rows: ParsedDonorRow[];
}> {

  const worker =
    await Tesseract.createWorker("eng");

  const result =
    await worker.recognize(buffer);

  await worker.terminate();

  const rawText =
    result.data.text;

  const rows =
    extractRowsFromText(rawText);

  return {
    rawText,
    rows,
  };
}