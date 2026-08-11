export type ImportSource =
  | "excel"
  | "pdf"
  | "image";

export interface ParsedDonorRow {
  fullName: string;

  fatherName?: string;

  whatsappNumber: string;

  localNumber?: string;

  bloodGroup: string;

  city?: string;

  presentAddress?: string;

  permanentAddress?: string;

  cnic?: string;

  age?: number | null;

  weight?: number | null;

  email?: string;

  status?: string;

  notes?: string;
}

export interface PreviewRow {
  rowIndex: number;

  data: ParsedDonorRow;

  status:
    | "valid"
    | "duplicate"
    | "invalid";

  reason: string;
}

export interface ImportCounts {
  total: number;

  valid: number;

  duplicate: number;

  invalid: number;
}