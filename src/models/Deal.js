import mongoose from "mongoose";

const dealSchema = new mongoose.Schema(
  {
    item_id: {   
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
    },
    promocode: {
      type: String,
      required: true,
      trim: true,
      match: /^\d+$/, // only digits, allows leading 0
    },
    from_date: {
      type: Date,
      required: true,
    },
    to_date: {
      type: Date,
      default: null,
    },
    business_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business",
        default: null,
    },
    amount_off: {
      type: Number,
      required: true,
      min: 0,
    },
    minimum_quantity: {
      type: Number,
      min: 0,
      default: null,
    },
    maximum_quantity: {
      type: Number,
      min: 0,
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

export const Deal = mongoose.model("Deal", dealSchema);