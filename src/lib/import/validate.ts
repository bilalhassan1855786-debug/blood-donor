import { ParsedDonorRow } from "./types";
import { BLOOD_GROUPS } from "./constants";

// Fields we consider necessary for a donor profile to be usable —
// missing any of these flags the imported record as "incomplete" so
// admins can follow up, without blocking the import itself.
const REQUIRED_PROFILE_FIELDS: {
  key: keyof ParsedDonorRow;
  label: string;
}[] = [
  { key: "fullName", label: "Full Name" },
  { key: "whatsappNumber", label: "WhatsApp Number" },
  { key: "bloodGroup", label: "Blood Group" },
  { key: "city", label: "City" },
  { key: "cnic", label: "CNIC" },
  { key: "age", label: "Age" },
  { key: "weight", label: "Weight" },
];

export function computeProfileStatus(
  row: Record<string, any>
): {
  profileStatus: "complete" | "incomplete";
  missingFields: string[];
} {
  const missingFields = REQUIRED_PROFILE_FIELDS.filter(({ key }) => {
    const value = row[key];
    return value === undefined || value === null || value === "";
  }).map(({ label }) => label);

  return {
    profileStatus: missingFields.length === 0 ? "complete" : "incomplete",
    missingFields,
  };
}

export function normalizeRow(
  row: ParsedDonorRow
): ParsedDonorRow {
  return {
    fullName:
      row.fullName?.trim() || "",

    fatherName:
      row.fatherName?.trim() || "",

    whatsappNumber:
      row.whatsappNumber
        ?.replace(/\s|-/g, "") || "",

    localNumber:
      row.localNumber
        ?.replace(/\s|-/g, "") || "",

    bloodGroup:
      row.bloodGroup
        ?.toUpperCase()
        .trim() || "",

    city:
      row.city?.trim() || "",

    presentAddress:
      row.presentAddress?.trim() || "",

    permanentAddress:
      row.permanentAddress?.trim() || "",

    cnic:
      row.cnic?.trim() || "",

    age:
      row.age ?? null,

    weight:
      row.weight ?? null,

    email:
      row.email?.trim() || "",

    status:
      row.status || "approved",

    notes:
      row.notes || "",
  };
}

export function validateRow(
  row: ParsedDonorRow
) {
  const errors: string[] = [];

  // Name required
  if (!row.fullName) {
    errors.push("Missing Name");
  }

  // Blood group required
  if (
    row.bloodGroup &&
    !BLOOD_GROUPS.includes(row.bloodGroup)
  ) {
    errors.push("Invalid Blood Group");
  }

  // Age

  if (
    row.age &&
    (row.age < 18 ||
      row.age > 65)
  ) {
    errors.push("Invalid Age");
  }

  // Weight

  if (
    row.weight &&
    row.weight < 45
  ) {
    errors.push("Weight too low");
  }

  return {
    valid:
      errors.length === 0,
    errors,
  };
}