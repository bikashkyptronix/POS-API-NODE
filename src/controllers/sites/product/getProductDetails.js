import { userService } from "../../../services/index.js";
import { StatusError, envs } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { v4 as uuidv4 } from "uuid";
import { Product } from "../../../models/Product.js";
import { MAIL_TEMPLATE } from "../../../utils/constants.js";

export const getProductDetails = async (req, res, next) => {
  try {
    const productId = req.params.id;

    const product = await Product.findOne({
      _id: productId,
      business_id: req.userDetails.business_id
    }).lean();

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Optional: Format the response
    const result = {
      id: product._id,
      product_name: product.product_name,
      category_id: product.category_id,
      product_sku: product.product_sku,
      product_quantity: product.product_quantity,
      for_sale: product.for_sale,
      purchase_price: product.purchase_price,
      selling_price: product.selling_price,
      tax_percentage: product.tax_percentage,
      product_image: product.product_image,
      status: product.status,
      created_at: product.createdAt,
      updated_at: product.updatedAt
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