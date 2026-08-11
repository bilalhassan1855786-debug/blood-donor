// seed-donors.js
// Run: node seed-donors.js

const mongoose = require("mongoose");

      const MONGODB_URI=mongodb+srv//bilalazam:bilal786@cluster0.we8aocl.mongodb.net/blood-donor-app?retryWrites=true&w=majority


const donorSchema = new mongoose.Schema({
  name: String,
  fatherName: String,
  bloodGroup: String,
  whatsapp: String,
  localNumber: String,
  gmail: String,
  address: String,
  city: String,
}, { timestamps: true });

const Donor = mongoose.models.Donor || mongoose.model("Donor", donorSchema);

const sampleDonors = [
  {
    name: "Ali Hassan",
    fatherName: "Muhammad Hassan",
    bloodGroup: "A+",
    whatsapp: "03001234567",
    localNumber: "04235678901",
    gmail: "ali.hassan@gmail.com",
    address: "House 12, Block C, Gulberg",
    city: "Lahore",
  },
  {
    name: "Sara Ahmed",
    fatherName: "Tariq Ahmed",
    bloodGroup: "B+",
    whatsapp: "03111234567",
    localNumber: "04235678902",
    gmail: "sara.ahmed@gmail.com",
    address: "Flat 5, Defence Phase 2",
    city: "Lahore",
  },
  {
    name: "Usman Khan",
    fatherName: "Zafar Khan",
    bloodGroup: "O+",
    whatsapp: "03211234567",
    localNumber: "05135678901",
    gmail: "usman.khan@gmail.com",
    address: "Street 3, G-10 Markaz",
    city: "Islamabad",
  },
  {
    name: "Fatima Malik",
    fatherName: "Asif Malik",
    bloodGroup: "AB+",
    whatsapp: "03331234567",
    localNumber: "05135678902",
    gmail: "fatima.malik@gmail.com",
    address: "House 8, F-7/2",
    city: "Islamabad",
  },
  {
    name: "Bilal Raza",
    fatherName: "Raza Hussain",
    bloodGroup: "A-",
    whatsapp: "03451234567",
    localNumber: "02135678901",
    gmail: "bilal.raza@gmail.com",
    address: "Flat 10, Clifton Block 4",
    city: "Karachi",
  },
  {
    name: "Ayesha Siddiqui",
    fatherName: "Imran Siddiqui",
    bloodGroup: "B-",
    whatsapp: "03561234567",
    localNumber: "02135678902",
    gmail: "ayesha.siddiqui@gmail.com",
    address: "House 22, DHA Phase 6",
    city: "Karachi",
  },
  {
    name: "Hamza Sheikh",
    fatherName: "Khalid Sheikh",
    bloodGroup: "O-",
    whatsapp: "03001112233",
    localNumber: "04235678903",
    gmail: "hamza.sheikh@gmail.com",
    address: "House 45, Johar Town",
    city: "Lahore",
  },
  {
    name: "Zainab Butt",
    fatherName: "Naveed Butt",
    bloodGroup: "AB-",
    whatsapp: "03111112233",
    localNumber: "04235678904",
    gmail: "zainab.butt@gmail.com",
    address: "House 7, Model Town",
    city: "Lahore",
  },
  {
    name: "Kashif Iqbal",
    fatherName: "Iqbal Hussain",
    bloodGroup: "A+",
    whatsapp: "03211112233",
    localNumber: "04135678901",
    gmail: "kashif.iqbal@gmail.com",
    address: "House 33, Cantt Area",
    city: "Rawalpindi",
  },
  {
    name: "Nida Farooq",
    fatherName: "Farooq Ahmad",
    bloodGroup: "O+",
    whatsapp: "03331112233",
    localNumber: "04135678902",
    gmail: "nida.farooq@gmail.com",
    address: "Flat 2, Bahria Town",
    city: "Rawalpindi",
  },
];

async function seedDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected");

    await Donor.deleteMany({}); // pehle wale clear karo
    console.log("🗑️  Old donors cleared");

    await Donor.insertMany(sampleDonors);
    console.log("✅ 10 sample donors inserted!\n");

    console.log("📊 Summary:");
    console.log("  Lahore:      Ali Hassan (A+), Sara Ahmed (B+), Hamza Sheikh (O-), Zainab Butt (AB-)");
    console.log("  Islamabad:   Usman Khan (O+), Fatima Malik (AB+)");
    console.log("  Karachi:     Bilal Raza (A-), Ayesha Siddiqui (B-)");
    console.log("  Rawalpindi:  Kashif Iqbal (A+), Nida Farooq (O+)");
    console.log("\n🔍 Test Filters:");
    console.log("  bloodGroup=A+           → 2 donors (Ali Hassan, Kashif Iqbal)");
    console.log("  city=Lahore             → 4 donors");
    console.log("  bloodGroup=O+&city=Islamabad → 1 donor (Usman Khan)");

    await mongoose.disconnect();
    console.log("\n✅ Done! Ab apna app check karo.");
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

seedDB();
