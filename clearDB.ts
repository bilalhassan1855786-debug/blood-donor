import mongoose from "mongoose";
import Donor from "./src/models/Donor";
import connectDB from "./src/lib/mongodb";

async function clearDB() {
  try {
    await connectDB();

    await Donor.deleteMany({});

    console.log("✅ All donors deleted");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

clearDB();