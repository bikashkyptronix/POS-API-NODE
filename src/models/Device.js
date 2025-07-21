import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema(
  {
    device_name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    device_type: {
      type: String,
      required: true,
      trim: true,
    },
    business_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business",
        default: null,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export const Device = mongoose.model("Device", deviceSchema);