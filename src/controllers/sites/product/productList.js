import bcrypt from "bcrypt";
import { userService } from "../../../services/index.js";
import { StatusError, envs } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { v4 as uuidv4 } from "uuid";
import { Product } from "../../../models/Product.js";
import { MAIL_TEMPLATE } from "../../../utils/constants.js";

/**
 * productList
 * User can get productList with details
 * @param req
 * @param res
 * @param next
 */
export const productList = async (req, res, next) => {
  try {
    const { page = 1, limit = 2, search_text = '' } = req.body;

    const pageNumber = parseInt(page);
    const pageSize = parseInt(limit);

    // Build base condition
    let condition = {
      status: "active",
      business_id: req.userDetails.business_id,
    };

    // Add search condition if search_text is provided
    if (search_text && search_text.trim() !== '') {
      condition.product_name = { $regex: search_text, $options: 'i' }; // Case-insensitive partial match
    }

    // Count total documents with condition
    const totalRecords = await Product.countDocuments(condition);

    // Fetch paginated data
    const getProducts = await Product.find(condition)
      .sort({ createdAt: -1 }) // Sort by latest
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .lean();

    // Format result
    const results = getProducts.map(data => ({
      id: data._id,
      name: data.product_name,
      product_sku: data.product_sku,
      quantity: data.product_quantity,
      purchase_price: data.purchase_price,
      selling_price: data.selling_price,
      tax_percentage: data.tax_percentage,
      status: data.status,
    }));

    return res.ok({
      page: pageNumber,
      limit: pageSize,
      total_records: totalRecords,
      total_pages: Math.ceil(totalRecords / pageSize),
      results: results,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
