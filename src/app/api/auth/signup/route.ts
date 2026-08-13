import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectDB();

    const {
      photo,
      fullName,
      fatherName,
      email,
      password,
      whatsappNumber,
      localNumber,
      bloodGroup,
      city,
      presentAddress,
      permanentAddress,
      cnic,
      age,
      weight,
      acceptedTerms,
    } = await req.json();

    // required fields
    if (
      !fullName ||
      !password ||
      !whatsappNumber ||
      !city ||
      !presentAddress ||
      !bloodGroup
    ) {
      return Response.json(
        {
          success: false,
          message:
            "Required fields are missing",
        },
        { status: 400 }
      );
    }

    // email duplicate check only if email exists
    if (email?.trim()) {
      const existingUser =
        await User.findOne({
          email,
        });

      if (existingUser) {
        return Response.json(
          {
            success: false,
            message:
              "Email already exists",
          },
          { status: 400 }
        );
      }
    }

    // CNIC duplicate check only if CNIC exists
    if (cnic?.trim()) {
      const existingCnic =
        await User.findOne({
          cnic,
        });

      if (existingCnic) {
        return Response.json(
          {
            success: false,
            message:
              "CNIC already exists",
          },
          { status: 400 }
        );
      }
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const user =
      await User.create({
        photo: photo || "",

        fullName,
        fatherName:
          fatherName || "",

        
          email: email?.trim() || undefined,

        password:
          hashedPassword,

        whatsappNumber,

        localNumber:
          localNumber || "",

        bloodGroup,

        city,

        presentAddress,

        permanentAddress:
          permanentAddress ||
          presentAddress,

        cnic:
          cnic || "",

        age:
          age || null,

        weight:
          weight || null,

        role: "user",

        isEligible:
          age >= 18,
          signupTermsAccepted:
  acceptedTerms,

signupTermsAcceptedAt:
  acceptedTerms
    ? new Date()
    : null,
      });

    return Response.json({
      success: true,
      user,
    });
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message:
          error.message,
      },
      { status: 500 }
    );
  }
}