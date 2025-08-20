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
    log_userId: {
      type: String,
      unique: true,
      default: null
    },
    password_hash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["superadmin","admin", "customer", "staff", "vendor", "supplier"],
      required: true,
    },
    staff_position: {
      type: String,
      required: false,
    },
    staff_aadhar: {
      type: String,
      default: null
    },
    business_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      default: null,
    },
    owner_business_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      default: null,
    },
    supplier_choose_cat_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    phone: {
      type: String,
      trim: true,
    },
    date_of_birth: {
      type: Date,
      default: null,
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
    profile_image: {
      type: String,
      default: null,
    },
    business_logo: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    permissions: {
      type: [String],
      default: [],
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export const User = mongoose.model("User", userSchema);