import connectDB from "@/lib/mongodb";
import Donor from "@/models/Donor";
import { ParsedDonorRow } from "./types";

export type DuplicateIndex = {
  phones: Set<string>;
  cnics: Set<string>;
};

export async function buildDuplicateIndex(): Promise<DuplicateIndex> {
  await connectDB();

  const donors = await Donor.find(
    {},
    {
      whatsappNumber: 1,
      cnic: 1,
    }
  ).lean();

  const phones = new Set<string>();
  const cnics = new Set<string>();

  for (const donor of donors) {
    if (donor.whatsappNumber) {
      phones.add(
        donor.whatsappNumber
          .replace(/\s|-/g, "")
          .trim()
      );
    }

    if (donor.cnic) {
      cnics.add(
        donor.cnic
          .replace(/\s|-/g, "")
          .trim()
      );
    }
  }

  return {
    phones,
    cnics,
  };
}

export function checkDuplicate(
  row: ParsedDonorRow,
  index: DuplicateIndex
) {
  const phone = row.whatsappNumber
    ?.replace(/\s|-/g, "")
    .trim();

  const cnic = row.cnic
    ?.replace(/\s|-/g, "")
    .trim();

  if (phone && index.phones.has(phone)) {
    return {
      isDuplicate: true,
      reason: "Phone already exists",
    };
  }

  if (cnic && index.cnics.has(cnic)) {
    return {
      isDuplicate: true,
      reason: "CNIC already exists",
    };
  }

  return {
    isDuplicate: false,
    reason: "",
  };
}