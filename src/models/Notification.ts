import mongoose, { Schema } from "mongoose";

const NotificationSchema = new Schema(
  {
    // Notification receiver
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Receiver role
    role: {
      type: String,
      enum: [
        "user",
        "donor",
        "admin",
        "superadmin",
      ],
      required: true,
    },

    // Notification type
    type: {
      type: String,
      enum: [
        "donor_request",
        "donor_approved",
        "donor_rejected",
        "blood_request",
        "emergency_request",
        "donation_completed",
        "achievement",
        "announcement",
        "system",
      ],
      default: "system",
    },

    // Title
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Message
    message: {
      type: String,
      required: true,
    },

    // Redirect link
    link: {
      type: String,
      default: "",
    },

    // Optional image/icon
    image: {
      type: String,
      default: "",
    },

    // Read status
    isRead: {
      type: Boolean,
      default: false,
    },

    // Extra metadata
    metadata: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

export default
  mongoose.models.Notification ||
  mongoose.model(
    "Notification",
    NotificationSchema
  );