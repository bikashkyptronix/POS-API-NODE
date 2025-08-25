import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    stock_code: { type: String, required: true, trim: true },
    qty_on_hand: { type: Number, required: true, min: 0 },
    qty_cases: { type: Number, required: true, min: 0 },
    product_quantity: { type: Number, default: 0, min: 0 },
    product_name: { type: String, required: true, trim: true },
    product_size: { type: String, required: true, trim: true },

    selected_vendor_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    selected_category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },
    selected_supplier_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },

    product_sku: { type: String, trim: true, unique: true, sparse: true },

    product_price: { type: Number, required: true, min: 0 },
    product_avg_price: { type: Number, required: true, min: 0 },
    product_latest_cost: { type: Number, required: true, min: 0 },
    product_margin: { type: Number, default: 0, min: 0 },
    product_markup: { type: Number, default: 0, min: 0 },
    tax_percentage: { type: Number, default: 0, min: 0, max: 100 },

    unit_per_case: { type: String, required: true, trim: true },
    case_cost_total: { type: Number, required: true, min: 0 },

    reorder_value: { type: Number, default: 0, min: 0 },
    reorder_point: { type: Number, default: 0, min: 0 },
    product_rank: { type: Number, default: 0, min: 0 },

    business_id: { type: mongoose.Schema.Types.ObjectId, ref: "Business", default: null },
    status: { type: String, enum: ["active", "inactive"], default: "active" },

    don_not_auto_update: { type: Boolean, default: false },
    add_to_shortcut_key: { type: Boolean, default: false },
    shortcut_key_color: { type: String, default: null },
    do_not_manual_discount: { type: Boolean, default: false },
    do_not_show_to_webstore: { type: Boolean, default: false },
    ebt_eligible: { type: Boolean, default: false },
    do_not_track_inventory: { type: Boolean, default: false },
    close_out_item: { type: Boolean, default: false },
    exclude_from_promotions_discount: { type: Boolean, default: false },
    hide_inventory: { type: Boolean, default: false },
    product_default_quantity: { type: Number, default: 0, min: 0 },
    product_min_price: { type: Number, required: false, min: 0 },
    remind_date: { type: String, default: null },
    notes: { type: String, default: null },
    tags: { type: String, default: null },
    points_multiplier: { type: String, default: null },
    points_required: { type: Number, required: false, min: 0 },
    item_type: { type: String, default: null },
    

    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    updated_by: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export const Product = mongoose.model("Product", productSchema);