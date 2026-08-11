import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import connectDB from "@/lib/mongodb";

import Donor from "@/models/Donor";
import { createOrFindUser } from "@/lib/import/createUser";

export async function POST(req: Request) {
  try {
    await connectDB();

    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    if (
      decoded.role !== "admin" &&
      decoded.role !== "superadmin"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden",
        },
        {
          status: 403,
        }
      );
    }

    const body = await req.json();

    // Preview page sirf selected donor objects bhejti hai
    const donors = body.rows || [];

    if (!donors.length) {
      return NextResponse.json(
        {
          success: false,
          message: "No donors received",
        },
        {
          status: 400,
        }
      );
    }

    const donorDocs: any[] = [];

    let usersCreated = 0;
    let existingUsers = 0;
    let donorsWithoutAccount = 0;

    for (const donor of donors) {

      const account =
        await createOrFindUser(
          donor,
          decoded.id
        );

      if (account.created) {
        usersCreated++;
      } else if (account.user) {
        existingUsers++;
      } else {
        donorsWithoutAccount++;
      }

      donorDocs.push({
        ...donor,

        userId:
          account.user?._id || null,

        status: "approved",

        approvedBy: decoded.id,

        approvedAt: new Date(),

        healthChecked: true,

        healthCheckedAt: new Date(),

        termsAccepted: true,

        termsAcceptedAt: new Date(),

        totalDonations:
          donor.totalDonations || 0,
      });
    }

    const operations = donorDocs.map((donor: any) => {
      const filters: any[] = [];

      if (donor.whatsappNumber) {
        filters.push({ whatsappNumber: donor.whatsappNumber });
      }

      if (donor.cnic) {
        filters.push({ cnic: donor.cnic });
      }

      return {
        updateOne: {
          filter: {
            $or: filters,
          },
          update: {
            $setOnInsert: donor,
          },
          upsert: true,
        },
      };
    });
    const result = await Donor.bulkWrite(
      operations,
      {
        ordered: false,
      }
    );

    return NextResponse.json({
      success: true,

      summary: {
        total: donors.length,

        imported:
          result.upsertedCount,

        usersCreated,

        existingUsers,

        donorsWithoutAccount,

        duplicates: 0,

        invalid: 0,

        skipped:
          donors.length -
          result.upsertedCount,

        failed: 0,
      },
    });

  } catch (error: any) {

    console.error(
      "IMPORT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Import failed",
      },
      {
        status: 500,
      }
    );
  }
}