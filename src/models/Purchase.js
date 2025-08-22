import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    purchase_id: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    // vendor reference (optional)
    vendor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",   // since vendors are users
      default: null,
    },
    due_date: {
      type: String,
      required: true,
    },
    invoice_number: {
      type: String,
      required: true,
      trim: true,
    },
    purchase_description: {
      type: String,
      required: true,
      trim: true,
    },
    purchase_pay_amount: {
      type: Number,
      required: true,
      min: 0,
      // precision(2) from Joi means we store a decimal with 2 places
      // In Mongo, use Number (JS doesn't enforce precision, but validation layer ensures it)
    },
    purchase_invoice_image: {
      type: String,   // will store Cloudinary URL / local path
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    business_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      default: null,
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

export const Purchase = mongoose.model("Purchase", purchaseSchema);