import bcrypt from "bcryptjs";
import User from "@/models/user";
import { normalizePhone } from "@/lib/normalizePhone";

type DonorData = {
  fullName: string;
  fatherName?: string;
  email?: string;
  whatsappNumber?: string;
  localNumber?: string;
  bloodGroup?: string;
  city?: string;
  presentAddress?: string;
  permanentAddress?: string;
  cnic?: string;
  age?: number | null;
  weight?: number | null;
  availabilityStatus?: string;
  totalDonations?: number;
};

export async function createOrFindUser(
  donor: DonorData,
  adminId: string
) {

  const email =
    donor.email?.trim().toLowerCase() || "";

  const phone =
    normalizePhone(
      donor.whatsappNumber || ""
    );

  const localPhone =
    normalizePhone(
      donor.localNumber || ""
    );

  // Login info hi nahi
  if (!email && !phone && !localPhone) {
    return {
      user: null,
      created: false,
    };
  }

  const existing =
    await User.findOne({
      $or: [

        ...(email
          ? [{ email }]
          : []),

        ...(phone
          ? [
              {
                whatsappNumber:
                  phone,
              },
            ]
          : []),

        ...(localPhone
          ? [
              {
                localNumber:
                  localPhone,
              },
            ]
          : []),
      ],
    });

  if (existing) {
    return {
      user: existing,
      created: false,
    };
  }

  const hashedPassword =
    await bcrypt.hash(
      "123456",
      10
    );
      const user =
    await User.create({

      fullName:
        donor.fullName,

      fatherName:
        donor.fatherName || "",

      email,

      password:
        hashedPassword,

      whatsappNumber:
        phone,

      localNumber:
        localPhone,

      bloodGroup:
        donor.bloodGroup || "",

      city:
        donor.city || "",

      presentAddress:
        donor.presentAddress || "",

      permanentAddress:
        donor.permanentAddress || "",

      cnic:
        donor.cnic || "",

      age:
        donor.age || null,

      weight:
        donor.weight || null,

      role: "user",

      approvalStatus:
        "approved",

      mustChangePassword:
        true,

      profileStatus:
        "incomplete",

      missingFields: [],

      availabilityStatus:
        donor.availabilityStatus ||
        "available",

      totalDonations:
        donor.totalDonations || 0,

      importedBy:
        adminId,

      signupTermsAccepted:
        true,

      signupTermsAcceptedAt:
        new Date(),

    });

  return {

    user,

    created: true,

  };

}