import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      fullName,
      email,
      password,
      phone,
      city,
      bloodGroup,
    } = body;

    // check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return Response.json(
        {
          success: false,
          message: "Email already exists",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      phone,
      city,
      bloodGroup,
      role: "user",
    });

    return Response.json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}