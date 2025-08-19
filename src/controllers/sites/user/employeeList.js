import bcrypt from "bcrypt";
import { userService } from "../../../services/index.js";
import { StatusError, envs } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { v4 as uuidv4 } from "uuid";
import { User } from "../../../models/User.js";
import { MAIL_TEMPLATE } from "../../../utils/constants.js";

/**
 * employeeList
 * User can get employeeList with details
 * @param req
 * @param res
 * @param next
 */
export const employeeList = async (req, res, next) => {
  try {
    const { page = 1, limit = 2, search_text = '' } = req.body;

    const pageNumber = parseInt(page);
    const pageSize = parseInt(limit);

    // Optional: add search/filter conditions
    let condition = {
      status: "active",
      role: "staff",
      owner_business_id: req.userDetails.business_id,
    };

    // Add search condition if search_text is provided
    if (search_text && search_text.trim() !== '') {
      condition.full_name = { $regex: search_text, $options: 'i' }; // Case-insensitive partial match
    }

    // Count total documents
    const totalRecords = await User.countDocuments(condition);

    // Fetch paginated data
    const employees = await User.find(condition)
      .sort({ createdAt: -1 }) // Sort by latest
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .lean(); // faster and returns plain JS objects

    // Optional: format data
    const results = employees.map(data => {
    const dob = data.date_of_birth
        ? new Date(data.date_of_birth).toLocaleDateString("en-US") // 👉 formats as MM/DD/YYYY
        : null;

    return {
        id: data._id,
        name: data.full_name,
        email: data.email,
        log_userId: data.log_userId,
        mobile: data.phone,
        staff_position: data.staff_position,
        dob: dob,
        address: data.address,
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
