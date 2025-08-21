import { Product } from "../../../models/Product.js";
import { ProductImage } from "../../../models/ProductImage.js";

export const getProductDetails = async (req, res, next) => {
  try {
    const productId = req.params.id;

    // 1. Find product by ID and business
    const product = await Product.findOne({
      _id: productId,
      status: "active",
      business_id: req.userDetails.business_id
    }).lean();

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 2. Find product images
    const productImages = await ProductImage.find({
      product_id: productId
    }).lean();

    // 3. Build result with all fields used in add/update
    const result = {
      id: product._id,
      stock_code: product.stock_code,
      qty_on_hand: product.qty_on_hand,
      qty_cases: product.qty_cases,
      product_quantity: product.product_quantity,
      product_name: product.product_name,
      product_size: product.product_size,

      selected_vendor_id: product.selected_vendor_id,
      selected_category_id: product.selected_category_id,
      selected_supplier_id: product.selected_supplier_id,

      product_sku: product.product_sku,
      product_price: product.product_price,
      product_avg_price: product.product_avg_price,
      product_latest_cost: product.product_latest_cost,
      product_margin: product.product_margin,
      product_markup: product.product_markup,
      tax_percentage: product.tax_percentage,

      unit_per_case: product.unit_per_case,
      case_cost_total: product.case_cost_total,

      reorder_value: product.reorder_value,
      reorder_point: product.reorder_point,
      product_rank: product.product_rank,

      business_id: product.business_id,
      status: product.status,
      created_at: product.createdAt,
      updated_at: product.updatedAt,

      // Images collection data
      images: productImages.map(img => ({
        id: img._id,
        url: img.image_url,
        created_at: img.createdAt,
      }))
    };

    return res.ok({
      message: "Product details fetched successfully",
      product: result
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};