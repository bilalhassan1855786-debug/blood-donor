import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import Donor from "@/models/Donor";
import { computeProfileStatus } from "./validate";

export const DEFAULT_IMPORT_PASSWORD = "123456";

export async function bulkInsertDonors(
  rows: Record<string, any>[],
  importedByUserId: string
): Promise<{
  imported: number; // counts actual Donor records created — this is
  //                   what "Manage Donors" / donor stats actually read.
  failed: number;
  insertedUserIds: string[];
  insertedDonorIds: string[];
  failedRows: { row: number; name: string; reason: string }[];
}> {
  await connectDB();

  const hashedPassword = await bcrypt.hash(DEFAULT_IMPORT_PASSWORD, 10);

  // Pre-generate each row's User _id so we can link the Donor record
  // to it without a round trip, and so we can match insertMany
  // results back to the original row reliably (order isn't guaranteed
  // with ordered:false).
  const prepared = rows.map((row) => {
    const userId = new mongoose.Types.ObjectId();
    const { profileStatus, missingFields } = computeProfileStatus(row);

    return {
      userId,
      userDoc: {
        _id: userId,
        fullName: row.fullName,
        fatherName: row.fatherName || "",
        email: row.email || "",
        password: hashedPassword,
        whatsappNumber: row.whatsappNumber || "",
        localNumber: row.localNumber || "",
        bloodGroup: row.bloodGroup,
        city: row.city || "",
        presentAddress: row.presentAddress || "",
        permanentAddress: row.presentAddress || "",
        cnic: row.cnic || "",
        age: row.age || null,
        weight: row.weight || null,
        gender: row.gender || undefined, // undefined, not "" — avoids enum error
        role: "user",
        availabilityStatus: "available",
        isEligible: true,
        mustChangePassword: true,
        profileStatus,
        missingFields,
        importedBy: importedByUserId,
      },
      donorDoc: {
        userId,
        fullName: row.fullName,
        fatherName: row.fatherName || "",
        email: row.email || "",
        whatsappNumber: row.whatsappNumber || "",
        localNumber: row.localNumber || "",
        bloodGroup: row.bloodGroup,
        city: row.city || "",
        presentAddress: row.presentAddress || "",
        permanentAddress: row.presentAddress || "",
        cnic: row.cnic || "",
        age: row.age || null,
        weight: row.weight || null,
        availabilityStatus: "available",
        transportSupport: "no",
        healthChecked: true,
        healthCheckedAt: new Date(),
        termsAccepted: true,
        termsAcceptedAt: new Date(),
        totalDonations: 0,
        // Admin is importing this data directly, same trust level as
        // the single "Add Donor" form — so approve immediately rather
        // than leaving it pending.
        status: "approved",
        approvedBy: importedByUserId,
        approvedAt: new Date(),
      },
    };
  });

  const failedRows: { row: number; name: string; reason: string }[] = [];

  // Step 1: insert Users
  const succeededUserIds = new Set<string>();
  try {
    const result = await User.insertMany(
      prepared.map((p) => p.userDoc),
      { ordered: false }
    );
    result.forEach((doc: any) => succeededUserIds.add(doc._id.toString()));
  } catch (err: any) {
    if (err.insertedDocs) {
      err.insertedDocs.forEach((doc: any) => succeededUserIds.add(doc._id.toString()));
    }
    if (err.writeErrors) {
      for (const we of err.writeErrors) {
        const p = prepared[we.index];
        failedRows.push({
          row: we.index,
          name: p?.userDoc.fullName || "Unknown",
          reason: `Account: ${we.errmsg || "failed to save"}`,
        });
      }
    }
  }

  // Step 2: insert Donor records only for rows whose User account
  // actually succeeded — keeps User and Donor in sync.
  const donorDocsToInsert = prepared
    .filter((p) => succeededUserIds.has(p.userId.toString()))
    .map((p) => p.donorDoc);

  const insertedDonorIds: string[] = [];

  try {
    const donorResult = await Donor.insertMany(donorDocsToInsert, { ordered: false });
    donorResult.forEach((doc: any) => insertedDonorIds.push(doc._id.toString()));
  } catch (err: any) {
    if (err.insertedDocs) {
      err.insertedDocs.forEach((doc: any) => insertedDonorIds.push(doc._id.toString()));
    }
    if (err.writeErrors) {
      for (const we of err.writeErrors) {
        const d = donorDocsToInsert[we.index];
        failedRows.push({
          row: -1,
          name: d?.fullName || "Unknown",
          reason: `Donor record: ${we.errmsg || "failed to save"}`,
        });
      }
    }
  }

  return {
    imported: insertedDonorIds.length,
    failed: failedRows.length,
    insertedUserIds: Array.from(succeededUserIds),
    insertedDonorIds,
    failedRows,
  };
}