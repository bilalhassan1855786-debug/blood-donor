import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../src/models/user";
dotenv.config();



async function seedAdmins() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    const users = [
      {
        fullName: process.env.SUPER_ADMIN_NAME,
        email: process.env.SUPER_ADMIN_EMAIL,
        password: process.env.SUPER_ADMIN_PASSWORD,
        role: "superadmin",
      },
      {
        fullName: process.env.ADMIN1_NAME,
        email: process.env.ADMIN1_EMAIL,
        password: process.env.ADMIN1_PASSWORD,
        role: "admin",
      },
      {
        fullName: process.env.ADMIN2_NAME,
        email: process.env.ADMIN2_EMAIL,
        password: process.env.ADMIN2_PASSWORD,
        role: "admin",
      },
      {
        fullName: process.env.ADMIN3_NAME,
        email: process.env.ADMIN3_EMAIL,
        password: process.env.ADMIN3_PASSWORD,
        role: "admin",
      },
    ];

    for (const user of users) {
      const exists = await User.findOne({
        email: user.email,
      });

      if (!exists) {
        const hashedPassword = await bcrypt.hash(
          user.password!,
          12
        );

        await User.create({
          fullName: user.fullName,
          email: user.email,
          password: hashedPassword,
          role: user.role,
        });

        console.log(`✅ ${user.role} created: ${user.email}`);
      } else {
        console.log(`⚠️ Already exists: ${user.email}`);
      }
    }

    console.log("🎉 Seeding Completed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

seedAdmins();