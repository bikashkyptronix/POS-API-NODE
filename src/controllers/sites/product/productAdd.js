import bcrypt from "bcrypt";
import { userService } from "../../../services/index.js";
import { StatusError, envs } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { v4 as uuidv4 } from "uuid";
import { Product } from "../../../models/Product.js";
import { MAIL_TEMPLATE } from "../../../utils/constants.js";

/**
 * productAdd
 * User can productAdd with details
 * @param req
 * @param res
 * @param next
 */
export const productAdd = async (req, res, next) => {

  try {
       const reqBody = req.body;
       const userId = req.userDetails.userId;
      const {
        product_name,
        category_id,
        product_sku,
        product_quantity,
        for_sale,
        purchase_price,
        selling_price,
        tax_percentage,
      } = req.body;
  
    const imagePath = req.file ? `uploads/products/${req.file.filename}` : null;

    const newProduct = new Product({
    product_name,
    category_id,
    product_sku,
    product_quantity,
    for_sale,
    purchase_price,
    selling_price,
    tax_percentage,
    business_id: req.userDetails.business_id || null,
    status: "active",
    product_image: imagePath,
    created_by: req.userDetails.userId,
    updated_by: req.userDetails.userId,
    });

    const savedProduct = await newProduct.save();

      const insertedId = savedProduct._id;
      if(insertedId)
      {
          res.ok({
          message: "Product created successfully",
          product: newProduct
        });
      } else {
       throw StatusError.badRequest(res.__("serverError"));
      }
     
    } catch (error) {
      next(error);
    }
};
