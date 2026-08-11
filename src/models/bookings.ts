import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    // Links this booking back to the logged-in user who submitted it,
    // so "My Requests" can find it. Null for any older bookings that
    // were submitted before login was required.
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    requesterName: {
      type: String,
      required: true,
    },

    patientName: {
      type: String,
      required: true,
    },

    patientage: {
      type: Number,
      default: null,
    },

    gender: {
      type: String,
      required: true,
    },

    disease: {
      type: String,
      required: true,
    },

    bloodGroup: {
      type: String,
      required: true,
    },

    bloodUnits: {
      type: Number,
      default: 1,
    },

    patientHb: {
      type: String,
      default: "",
    },

    hospital: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    latitude: {
      type: Number,
      default: null,
    },

    longitude: {
      type: Number,
      default: null,
    },

    contactNumber: {
      type: String,
      required: true,
    },

    dateNeeded: {
      type: Date,
      required: true,
    },

    urgency: {
      type: String,
      enum: ["Normal", "Urgent", "Critical"],
      default: "Normal",
    },

    canProvideTransport: {
      type: String,
      enum: ["yes", "partial", "no", ""],
      default: "no",
    },

    notes: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);