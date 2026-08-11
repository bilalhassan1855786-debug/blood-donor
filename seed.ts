import dotenv from "dotenv";
dotenv.config();    
    
    
    import mongoose from "mongoose";
import Donor from "./src/models/Donor";
import connectDB from "./src/lib/mongodb";

async function seedDatabase() {
  try {
    await connectDB();

    await Donor.deleteMany({});

    await Donor.insertMany([
      {
        fullName: "Ali Hassan",
        fatherName: "Muhammad Hassan",
        bloodGroup: "A+",
        whatsappNumber: "923001112233",
        localNumber: "03001112233",
        gmail: "ali@gmail.com",
        address: "Gulberg",
        city: "Lahore",
        available: true,
      },
      {
        fullName: "Ahmed Raza",
        fatherName: "Raza Ahmed",
        bloodGroup: "O+",
        whatsappNumber: "923004445566",
        localNumber: "03004445566",
        gmail: "ahmed@gmail.com",
        address: "Johar Town",
        city: "Lahore",
        available: true,
      },
      {
        fullName: "Bilal Khan",
        fatherName: "Khan Muhammad",
        bloodGroup: "B+",
        whatsappNumber: "923007778899",
        localNumber: "03007778899",
        gmail: "bilal@gmail.com",
        address: "Saddar",
        city: "Karachi",
        available: true,
      },
      {
        fullName: "Usman Ali",
        fatherName: "Ali Akbar",
        bloodGroup: "AB+",
        whatsappNumber: "923003334455",
        localNumber: "03003334455",
        gmail: "usman@gmail.com",
        address: "F-10",
        city: "Islamabad",
        available: true,
      },
      {
        fullName: "Hamza Tariq",
        fatherName: "Tariq Mehmood",
        bloodGroup: "O-",
        whatsappNumber: "923009998877",
        localNumber: "03009998877",
        gmail: "hamza@gmail.com",
        address: "Hayatabad",
        city: "Peshawar",
        available: true,
      },
      {
        fullName: "Saad Malik",
        fatherName: "Malik Aslam",
        bloodGroup: "A-",
        whatsappNumber: "923001234567",
        localNumber: "03001234567",
        gmail: "saad@gmail.com",
        address: "Satellite Town",
        city: "Rawalpindi",
        available: true,
      },
      {
        fullName: "Zain Ahmed",
        fatherName: "Ahmed Nawaz",
        bloodGroup: "B-",
        whatsappNumber: "923005556677",
        localNumber: "03005556677",
        gmail: "zain@gmail.com",
        address: "Cantt",
        city: "Multan",
        available: true,
      },
      {
        fullName: "Hassan Javed",
        fatherName: "Javed Iqbal",
        bloodGroup: "AB-",
        whatsappNumber: "923008887766",
        localNumber: "03008887766",
        gmail: "hassan@gmail.com",
        address: "Model Town",
        city: "Faisalabad",
        available: true,
      },
    ]);

    console.log("✅ Sample donors inserted successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed Error:", error);
    process.exit(1);
  }
}

seedDatabase();