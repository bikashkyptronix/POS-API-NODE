import mongoose from "mongoose";

const fuelSchema = new mongoose.Schema(
  {
    business_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business",
        default: null,
    },
    regular_cash: {
      type: Number,
      required: true,
      min: 0,
    },
    regular_credit: {
      type: Number,
      required: true,
      min: 0,
    },
    plus_cash: {
      type: Number,
      required: true,
      min: 0,
    },
    plus_credit: {
      type: Number,
      required: true,
      min: 0,
    },
    premium_cash: {
      type: Number,
      required: true,
      min: 0,
    },
    premium_credit: {
      type: Number,
      required: true,
      min: 0,
    },
    diesel_cash: {
      type: Number,
      required: true,
      min: 0,
    },
    diesel_credit: {
      type: Number,
      required: true,
      min: 0,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "in-active"],
      default: "active",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export const Fuel = mongoose.model("Fuel", fuelSchema);