import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password_hash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["superadmin", "client", "staff"],
      required: true,
    },
    business_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      default: null,
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: new mongoose.Schema(
        {
          street: String,
          city: String,
          state: String,
          zip: String
        },
        { _id: false }
      ),
      default: {}
    },
    status: {
      type: String,
      enum: ["active", "in-active"],
      default: "active",
    },
    permissions: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export const User = mongoose.model("User", userSchema);