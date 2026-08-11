import mongoose, { Schema } from "mongoose";

const DonorSchema = new Schema(
  {
    // User Account Link
    userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: false,
  default: null,
  sparse: true,
},

    // Basic Info
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    fatherName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      default: "",
    },

    whatsappNumber: {
      type: String,
      required: true,
    },

    localNumber: {
      type: String,
      default: "",
    },

    age: {
      type: Number,
      default: null,
    },

    weight: {
      type: Number,
      default: null,
    },

    cnic: {
      type: String,
      default: "",
    },

    // Blood
    bloodGroup: {
      type: String,
      required: true,
    },

    // Address
    city: {
      type: String,
      required: true,
      trim: true,
    },

    presentAddress: {
      type: String,
      required: true,
    },

    permanentAddress: {
      type: String,
      required: true,
    },

    // Location (Optional)
    latitude: {
      type: Number,
      default: null,
    },

    longitude: {
      type: Number,
      default: null,
    },

    locationAddress: {
      type: String,
      default: "",
    },

    // Donor Picture
    photo: {
      type: String,
      default: "",
    },

    photoPublicId: {
      type: String,
      default: "",
    },

    // Last Donation
    lastDonationDate: {
      type: Date,
      default: null,
    },

    // Availability
    availabilityStatus: {
      type: String,
      enum: [
        "available",
        "busy",
        "out_of_city",
        "unavailable",
      ],
      default: "available",
    },

    // Transport
    transportSupport: {
      type: String,
      enum: [
        "yes",
        "partial",
        "no",
      ],
      default: "no",
    },

    // Bio
    bio: {
      type: String,
      default: "",
    },

    // Health
    healthChecked: {
      type: Boolean,
      default: false,
    },

    healthCheckedAt: {
      type: Date,
      default: null,
    },

    // Terms
    termsAccepted: {
      type: Boolean,
      default: false,
    },

    termsAcceptedAt: {
      type: Date,
      default: null,
    },

    // Eligibility
    isEligible: {
      type: Boolean,
      default: true,
    },

    // Admin Approval
    status: {
      type: String,
      enum: [
        "pending",
        "approved",
        "rejected",
      ],
      default: "pending",
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    approvedAt: {
      type: Date,
      default: null,
    },

    rejectionReason: {
      type: String,
      default: "",
    },

    // Statistics
    totalDonations: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Auto eligibility check
(DonorSchema as any).pre(
  "save",
  function (this: any) {
    if (!this.lastDonationDate) {
      this.isEligible = true;
      return;
    }

    const last = new Date(
      this.lastDonationDate
    );

    const today = new Date();

    const diff =
      (today.getTime() -
        last.getTime()) /
      (1000 * 60 * 60 * 24);

    this.isEligible =
      diff >= 90;
  }
);

const Donor =
  mongoose.models.Donor ||
  mongoose.model(
    "Donor",
    DonorSchema
  );

export default Donor;