import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
      trim: true,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: false, // You can set `true` if category is mandatory
    },
    product_sku: {
      type: String,
      trim: true,
      unique: true,
      sparse: true, // Allows multiple nulls
    },
    product_quantity: {
      type: Number,
      default: 0,
      min: 0,
    },
    for_sale: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },
    purchase_price: {
      type: Number,
      default: 0,
      min: 0,
    },
    selling_price: {
      type: Number,
      default: 0,
      min: 0,
    },
    tax_percentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
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
    product_image: {
      type: String,
      trim: true,
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

export const Product = mongoose.model("Product", productSchema);