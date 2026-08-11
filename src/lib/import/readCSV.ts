import Papa from "papaparse";

// Reads a .csv buffer/string and returns rows as plain objects, keyed
// by the file's actual header row.
export function readCSV(content: string): Record<string, any>[] {
  const result = Papa.parse<Record<string, any>>(content, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim(),
  });

  return result.data;
}