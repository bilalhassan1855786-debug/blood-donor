import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    fullName: {
      type: String,
      default: "",
    },

    sentiment: {
      type: String,
      enum: ["positive", "negative"],
      required: true,
    },

    comment: {
      type: String,
      default: "",
    },

    // true once the user was routed to the Play Store rating page
    routedToStore: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Feedback ||
  mongoose.model("Feedback", FeedbackSchema);