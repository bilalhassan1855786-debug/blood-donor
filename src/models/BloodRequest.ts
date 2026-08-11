import mongoose from "mongoose";

const BloodRequestSchema = new mongoose.Schema(
  {
    patientName: String,
    bloodGroup: String,
    city: String,
    hospital: String,
    contactNumber: String,
status: {
  type: String,
  enum: [
    "pending",
    "completed",
    "cancelled",
    "not_found",
  ],
  default: "pending",
},
    canProvideTransport: {
  type: String,
  default: "",
},
  },
  { timestamps: true }
);

export default mongoose.models.BloodRequest ||
mongoose.model(
  "BloodRequest",
  BloodRequestSchema
);