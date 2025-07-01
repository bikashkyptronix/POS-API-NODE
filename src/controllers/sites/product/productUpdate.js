import bcrypt from "bcrypt";
import { userService } from "../../../services/index.js";
import { StatusError, envs } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { v4 as uuidv4 } from "uuid";
import { Product } from "../../../models/Product.js";
import { MAIL_TEMPLATE } from "../../../utils/constants.js";

/**
 * productUpdate
 * User can productUpdate with details
 * @param req
 * @param res
 * @param next
 */
export const productUpdate = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const {
      product_name,
      category_id,
      product_sku,
      product_quantity,
      for_sale,
      purchase_price,
      selling_price,
      tax_percentage
    } = req.body;

    const imagePath = req.file ? `uploads/products/${req.file.filename}` : null;

    const existingProduct = await Product.findOne({
      _id: productId,
      business_id: req.userDetails.business_id
    });

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update fields
    existingProduct.product_name = product_name;
    existingProduct.category_id = category_id;
    existingProduct.product_sku = product_sku;
    existingProduct.product_quantity = product_quantity;
    existingProduct.for_sale = for_sale;
    existingProduct.purchase_price = purchase_price;
    existingProduct.selling_price = selling_price;
    existingProduct.tax_percentage = tax_percentage;
    existingProduct.updated_by = req.userDetails.userId;

    if (imagePath) {
      existingProduct.product_image = imagePath;
    }

    await existingProduct.save();

    return res.ok({
      message: "Product updated successfully",
      product: existingProduct
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};

