import bcrypt from "bcrypt";
import { userService } from "../../../services/index.js";
import { StatusError, envs } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { v4 as uuidv4 } from "uuid";
import { Group } from "../../../models/Group.js";
import { MAIL_TEMPLATE } from "../../../utils/constants.js";

/**
 * groupList
 * User can get groupList with details
 * @param req
 * @param res
 * @param next
 */
export const groupList = async (req, res, next) => {
  try {
    const { page = 1, limit = 2, search_text = '' } = req.body;

    const pageNumber = parseInt(page);
    const pageSize = parseInt(limit);

    // Optional: add search/filter conditions
    let condition = {
      status: "active",
      business_id: req.userDetails.business_id,
    };

    if (search_text && search_text.trim() !== '') {
      condition.group_name = { $regex: search_text, $options: 'i' }; // Case-insensitive partial match
    }

    // Count total documents
    const totalRecords = await Group.countDocuments(condition);

    // Fetch paginated data
    const groupList = await Group.find(condition)
      .sort({ createdAt: -1 }) // Sort by latest
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .lean(); // faster and returns plain JS objects

    // Optional: format data
    const results = groupList.map(data => {
    return {
        id: data._id,
        group_name: data.group_name,
        status: data.status,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
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