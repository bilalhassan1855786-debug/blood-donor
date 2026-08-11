import mongoose from "mongoose";

const ImportHistorySchema = new mongoose.Schema(
  {
    importedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fileName: {
      type: String,
      default: "",
    },

    totalRows: {
      type: Number,
      default: 0,
    },

    imported: {
      type: Number,
      default: 0,
    },

    skipped: {
      type: Number,
      default: 0,
    },

    failed: {
      type: Number,
      default: 0,
    },

    // IDs of the User docs this import created — enables a future
    // "Undo Last Import" feature (Phase 4) without extra bookkeeping.
    insertedUserIds: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },

    // IDs of the linked Donor docs this import created.
    insertedDonorIds: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Donor",
      default: [],
    },

    skippedReasons: {
      type: [
        {
          row: Number,
          name: String,
          reason: String,
        },
      ],
      default: [],
    },

    undone: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.ImportHistory ||
  mongoose.model("ImportHistory", ImportHistorySchema);