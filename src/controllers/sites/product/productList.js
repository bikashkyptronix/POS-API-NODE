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
    .sort({ createdAt: -1 })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .populate("selected_category_id", "category_name")   // only fetch category_name
    .populate("selected_vendor_id", "full_name role")        // only fetch name + role
    .populate("selected_supplier_id", "full_name role")      // only fetch name + role
    .lean();


    // Format result
    const results = getProducts.map(data => ({
      id: data._id,
      name: data.product_name,
      stock_code: data.stock_code || null,
      product_rank: data.product_rank || null,
      product_sku: data.product_sku || null,
      qty_on_hand: data.qty_on_hand || null,
      qty_cases: data.qty_cases || null,
      product_size: data.product_size || null,
      product_price: data.product_price || null,
      product_avg_price: data.product_avg_price || null,
      product_latest_cost: data.product_latest_cost || null,
      quantity: data.product_quantity || null,
      product_margin: data.product_margin || null,
      product_markup: data.product_markup || null,
      tax_percentage: data.tax_percentage || null,
      status: data.status || null,
      category_name: data.selected_category_id?.category_name || null,
      vendor_name: data.selected_vendor_id?.full_name || null,
      supplier_name: data.selected_supplier_id?.full_name || null,
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
