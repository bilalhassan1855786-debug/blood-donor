import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    fatherName: {
      type: String,
      default: "",
    },
gender: {
  type: String,
  enum: ["male", "female"],
},

age: {
  type: Number,
  default: null,
},

weight: {
  type: Number,
  default: null,
},
   email: {
  type: String,
  default: "",
},

    password: {
      type: String,
      required: true,
    },

    whatsappNumber: {
      type: String,
      default: "",
    },

    localNumber: {
      type: String,
      default: "",
    },

    bloodGroup: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    presentAddress: {
      type: String,
      default: "",
    },

    permanentAddress: {
      type: String,
      default: "",
    },

    cnic: {
      type: String,
      default: "",
    },

    lastDonationDate: {
      type: Date,
    },

    role: {
      type: String,
      enum: ["user", "admin", "superadmin", "developer"],
      default: "user",
    },
    isEligible: {
  type: Boolean,
  default: true,
},

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

totalDonations: {
  type: Number,
  default: 0,
},

photo: {
  type: String,
  default: "",
},

photoPublicId: {
  type: String,
  default: "",
},
dateOfBirth: {
  type: Date,
},



bio: {
  type: String,
  default: "",
},
signupTermsAccepted: {
  type: Boolean,
  default: false,
},

signupTermsAcceptedAt: {
  type: Date,
},
healthCheck: {
  passed: {
    type: Boolean,
    default: false,
  },

  checkedAt: {
    type: Date,
    default: null,
  },

  rejectionReason: {
    type: String,
    default: "",
  },

  nextEligibleDate: {
    type: Date,
    default: null,
  },

  answers: {
    ageConfirm: Boolean,
    weightQuestion: Boolean,

    hepatitis: Boolean,
    hiv: Boolean,
    bloodDisease: Boolean,
    seriousDisease: Boolean,

    recentSurgery: Boolean,
    fever: Boolean,
    pregnancy: Boolean,

    doctorRestriction: Boolean,
    recentDonation: Boolean,
  },
},
approvalStatus: {
  type: String,
  enum: [
    "pending",
    "approved",
    "rejected"
  ],
  default: "pending",
},

approvedBy: {
  type: String,
  default: "",
},

approvedAt: {
  type: Date,
  default: null,
},

rejectionReason: {
  type: String,
  default: "",
},

// ===== Bulk Import support =====
mustChangePassword: {
  type: Boolean,
  default: false,
},

profileStatus: {
  type: String,
  enum: ["complete", "incomplete"],
  default: "complete",
},

missingFields: {
  type: [String],
  default: [],
},

importedBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  default: null,
},
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User ||
  mongoose.model("User", UserSchema);