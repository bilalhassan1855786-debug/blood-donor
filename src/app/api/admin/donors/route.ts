import connectDB from "@/lib/mongodb";
import Donor from "@/models/Donor";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
try {
await connectDB();


const cookieStore = await cookies();
const token =
  cookieStore.get("token")
    ?.value;

if (!token) {
  return Response.json(
    {
      success: false,
      message:
        "Unauthorized",
    },
    {
      status: 401,
    }
  );
}

const decoded =
  jwt.verify(
    token,
    process.env.JWT_SECRET!
  ) as any;

if (
  decoded.role !==
    "admin" &&
  decoded.role !==
    "superadmin"
) {
  return Response.json(
    {
      success: false,
      message:
        "Forbidden",
    },
    {
      status: 403,
    }
  );
}

const donors =
  await Donor.find()
    .populate(
      "approvedBy",
      "fullName"
    )
    .sort({
      createdAt: -1,
    });

const stats = {
  total:
    donors.length,

  pending:
    donors.filter(
      (
        d: any
      ) =>
        d.status ===
        "pending"
    ).length,

  approved:
    donors.filter(
      (
        d: any
      ) =>
        d.status ===
        "approved"
    ).length,

  rejected:
    donors.filter(
      (
        d: any
      ) =>
        d.status ===
        "rejected"
    ).length,
};

return Response.json(
  {
    success: true,
    donors,
    stats,
  }
);


} catch (
error: any
) {
console.error(
"ADMIN DONORS ERROR:",
error
);


return Response.json(
  {
    success: false,
    message:
      error.message,
  },
  {
    status: 500,
  }
);


}
}
