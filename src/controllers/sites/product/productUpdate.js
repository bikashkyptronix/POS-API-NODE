import bcrypt from "bcrypt";
import { userService } from "../../../services/index.js";
import { StatusError, envs } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { v4 as uuidv4 } from "uuid";
import { Product } from "../../../models/Product.js";
import { ProductImage } from "../../../models/ProductImage.js";
import { MAIL_TEMPLATE } from "../../../utils/constants.js";

/**
 * productUpdate
 * User can update product details
 * @param req
 * @param res
 * @param next
 */
export const productUpdate = async (req, res, next) => {
  try {
    const productId = req.params.id;

    if (req.body.stock_code) {
      const duplicate = await Product.findOne({
        stock_code: req.body.stock_code,
        _id: { $ne: productId }, // exclude current record
      });

      if (duplicate) {
        return res.status(400).json({ message: "Stock code already exists" });
      }
    }

    // 1. Find product by ID & business_id
    const existingProduct = await Product.findOne({
      _id: productId,
      business_id: req.userDetails.business_id
    });

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 2. If SKU provided, check uniqueness (excluding current product)
    if (req.body.product_sku && req.body.product_sku !== existingProduct.product_sku) {
      const skuExists = await Product.findOne({
        product_sku: req.body.product_sku,
        business_id: req.userDetails.business_id,
        _id: { $ne: existingProduct._id }, // exclude current product
      });

      if (skuExists) {
        return res.status(400).json({ message: "Product SKU must be unique" });
      }
    }

    // 3. Update product fields (same as add)
    const updateFields = {
      stock_code: req.body.stock_code,
      qty_on_hand: req.body.qty_on_hand,
      qty_cases: req.body.qty_cases,
      product_quantity: req.body.product_quantity || 0,
      product_name: req.body.product_name,
      product_size: req.body.product_size,

      selected_vendor_id: req.body.selected_vendor_id || null,
      selected_category_id: req.body.selected_category_id || null,
      selected_supplier_id: req.body.selected_supplier_id || null,

      product_sku: req.body.product_sku || existingProduct.product_sku,
      product_price: req.body.product_price,
      product_avg_price: req.body.product_avg_price,
      product_latest_cost: req.body.product_latest_cost,
      product_margin: req.body.product_margin || 0,
      product_markup: req.body.product_markup || 0,
      tax_percentage: req.body.tax_percentage || 0,

      unit_per_case: req.body.unit_per_case,
      case_cost_total: req.body.case_cost_total,

      reorder_value: req.body.reorder_value || 0,
      reorder_point: req.body.reorder_point || 0,
      product_rank: req.body.product_rank || 0,
      status: req.body.status || existingProduct.status,

      // New Boolean fields
      don_not_auto_update: req.body.don_not_auto_update || false,
      add_to_shortcut_key: req.body.add_to_shortcut_key || false,
      do_not_manual_discount: req.body.do_not_manual_discount || false,
      do_not_show_to_webstore: req.body.do_not_show_to_webstore || false,
      ebt_eligible: req.body.ebt_eligible || false,
      do_not_track_inventory: req.body.do_not_track_inventory || false,
      close_out_item: req.body.close_out_item || false,
      exclude_from_promotions_discount: req.body.exclude_from_promotions_discount || false,
      hide_inventory: req.body.hide_inventory || false,

      // New Optional fields
      shortcut_key_color: req.body.shortcut_key_color || null,
      product_default_quantity: req.body.product_default_quantity || 0,
      product_min_price: req.body.product_min_price || null,
      remind_date: req.body.remind_date || null,
      notes: req.body.notes || null,
      tags: req.body.tags || null,
      points_multiplier: req.body.points_multiplier || null,
      points_required: req.body.points_required || null,
      item_type: req.body.item_type || null,

      updated_by: req.userDetails.userId,
    };

    Object.assign(existingProduct, updateFields);
    await existingProduct.save();

    // 4. If new images uploaded → insert into product_images
    if (req.files && req.files.length > 0) {
      const imageDocs = req.files.map((file) => ({
        product_id: existingProduct._id,
        image_url: file.path, // Cloudinary URL
        created_by: req.userDetails.userId,
      }));

      await ProductImage.insertMany(imageDocs);
    }

    return res.ok({
      message: "Product updated successfully",
      product: existingProduct,
    });

  } catch (error) {
    if (error.code === 11000 && error.keyPattern?.product_sku) {
      return res.status(400).json({ message: "Product SKU must be unique" });
    }
    console.error(error);
    next(error);
  }
};