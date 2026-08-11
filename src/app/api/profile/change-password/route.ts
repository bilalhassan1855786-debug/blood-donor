import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { currentPassword, newPassword } =
      await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        {
          message: "All fields are required.",
        },
        {
          status: 400,
        }
      );
    }

    if (newPassword.length < 4) {
      return NextResponse.json(
        {
          message:
            "Password must be at least 4 characters.",
        },
        {
          status: 400,
        }
      );
    }

    const token =
      req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
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

if (!decoded.id) {
  return NextResponse.json(
    {
      message: "Invalid Token",
    },
    {
      status: 401,
    }
  );
}

const user = await User.findById(decoded.id);

    
    

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found.",
        },
        {
          status: 404,
        }
      );
    }

    const passwordMatch =
      await bcrypt.compare(
        currentPassword,
        user.password
      );

    if (!passwordMatch) {
      return NextResponse.json(
        {
          message:
            "Current password is incorrect.",
        },
        {
          status: 400,
        }
      );
    }
    const samePassword = await bcrypt.compare(
  newPassword,
  user.password
);

if (samePassword) {
  return NextResponse.json(
    {
      message:
        "New password must be different from current password.",
    },
    {
      status: 400,
    }
  );
}

   const hashedPassword =
  await bcrypt.hash(newPassword, 10);

user.password = hashedPassword;

await user.save();

    return NextResponse.json({
      success: true,
      message:
        "Password updated successfully.",
    });
    await User.findByIdAndUpdate(userId, {
    password: hashedPassword,
    mustChangePassword: false,
});
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}