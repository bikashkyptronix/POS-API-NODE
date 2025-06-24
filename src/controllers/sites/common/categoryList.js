import bcrypt from "bcrypt";
import { userService } from "../../../services/index.js";
import { StatusError, envs } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { v4 as uuidv4 } from "uuid";
import { Category } from "../../../models/Category.js";
import { MAIL_TEMPLATE } from "../../../utils/constants.js";

/**
 * categoryList
 * User can get categoryList with details
 * @param req
 * @param res
 * @param next
 */
export const categoryList = async (req, res, next) => {
  try {
    const { page = 1, limit = 2 } = req.body;

    const pageNumber = parseInt(page);
    const pageSize = parseInt(limit);

    // Optional: add search/filter conditions
    let condition = {
      status: "active",
      business_id: req.userDetails.business_id
    };

    // Count total documents
    const totalRecords = await Category.countDocuments(condition);

    // Fetch paginated data
    const categories = await Category.find(condition)
      .sort({ createdAt: -1 }) // Sort by latest
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .lean(); // faster and returns plain JS objects

    // Optional: format data
    const results = categories.map(data => {

    return {
        id: data._id,
        name: data.category_name,
        slug: data.category_slug,
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