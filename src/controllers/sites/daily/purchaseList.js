import bcrypt from "bcrypt";
import { userService } from "../../../services/index.js";
import { StatusError, envs } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { v4 as uuidv4 } from "uuid";
import { Purchase } from "../../../models/Purchase.js";
import { MAIL_TEMPLATE } from "../../../utils/constants.js";

/**
 * purchaseList
 * User can get purchaseList with details
 * @param req
 * @param res
 * @param next
 */
export const purchaseList = async (req, res, next) => {
  try {
    const { page = 1, limit = 2 } = req.body;

    const pageNumber = parseInt(page);
    const pageSize = parseInt(limit);

    // Build base condition
    let condition = {
      status: "active",
      business_id: req.userDetails.business_id,
    };

    // Count total documents with condition
    const totalRecords = await Purchase.countDocuments(condition);

    // Fetch paginated data
    const getPurchases = await Purchase.find(condition)
    .sort({ createdAt: -1 })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .populate("vendor_id", "full_name")        // only fetch name + role
    .lean();


    // Format result
    const results = getPurchases.map(data => ({
      id: data._id,
      purchase_id: data.purchase_id,
      vendor_id: data.vendor_id?._id?.toString() || null, // ✅ keep just ID
      vendor_name: data.vendor_id?.full_name || null,
      due_date: data.due_date || null,
      invoice_number: data.invoice_number || null,
      purchase_pay_amount: data.purchase_pay_amount || null,
      purchase_invoice_image: data.purchase_invoice_image || null,
      purchase_description: data.purchase_description || null,
      status: data.status || null
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