import bcrypt from "bcrypt";
import { userService } from "../../../services/index.js";
import { StatusError, envs } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { v4 as uuidv4 } from "uuid";
import { Deal } from "../../../models/Deal.js";
import { MAIL_TEMPLATE } from "../../../utils/constants.js";

/**
 * dealsList
 * User can get dealsList with details
 * @param req
 * @param res
 * @param next
 */
export const dealsList = async (req, res, next) => {
  try {
    const { page = 1, limit = 2 } = req.body;

    const pageNumber = parseInt(page);
    const pageSize = parseInt(limit);

    // Optional: add search/filter conditions
    let condition = {
      status: "active",
      business_id: req.userDetails.business_id,
      created_by: req.userDetails.userId
    };

    // Count total documents
    const totalRecords = await Deal.countDocuments(condition);

    // Fetch paginated data
    const dealsList = await Deal.find(condition)
      .sort({ createdAt: -1 }) // Sort by latest
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .lean(); // faster and returns plain JS objects

    const results = dealsList.map(data => {
        const from_date = data.from_date
            ? new Date(data.from_date).toLocaleDateString("en-GB").replace(/\//g, ".")
            : null;

        const to_date = data.to_date
            ? new Date(data.to_date).toLocaleDateString("en-GB").replace(/\//g, ".")
            : null;

        return { 
            id: data._id,
            name: data.item_name,
            promocode: data.promocode,
            mobile: data.customer_mobile,
            from_date: from_date,
            to_date: to_date,
            amount_off: data.amount_off,
            minimum_quantity: data.minimum_quantity,
            maximum_quantity: data.maximum_quantity,
            status: data.status,
        };
    });

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