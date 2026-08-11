import {
  normalizeRow,
  validateRow,
} from "./validate";

import {
  buildDuplicateIndex,
  checkDuplicate,
} from "./checkDuplicates";

import {
  ParsedDonorRow,
  PreviewRow,
} from "./types";

export async function buildImportPreview(
  rows: ParsedDonorRow[]
) {
  const duplicateIndex =
    await buildDuplicateIndex();

  const results: PreviewRow[] = [];

  for (
    let i = 0;
    i < rows.length;
    i++
  ) {
    const row =
      normalizeRow(rows[i]);

    const validation =
      validateRow(row);

    if (!validation.valid) {
      results.push({
        rowIndex: i + 1,
        data: row,
        status: "invalid",
        reason:
          validation.errors.join(", "),
      });

      continue;
    }

    const duplicate =
      checkDuplicate(
        row,
        duplicateIndex
      );

    if (
      duplicate.isDuplicate
    ) {
      results.push({
        rowIndex: i + 1,
        data: row,
        status: "duplicate",
        reason:
          duplicate.reason,
      });

      continue;
    }

    results.push({
      rowIndex: i + 1,
      data: row,
      status: "valid",
      reason: "",
    });
  }

  return {
    results,

    counts: {
      total:
        results.length,

      valid:
        results.filter(
          (r) =>
            r.status ===
            "valid"
        ).length,

      duplicate:
        results.filter(
          (r) =>
            r.status ===
            "duplicate"
        ).length,

      invalid:
        results.filter(
          (r) =>
            r.status ===
            "invalid"
        ).length,
    },
  };
}