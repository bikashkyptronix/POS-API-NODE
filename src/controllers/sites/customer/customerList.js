import bcrypt from "bcrypt";
import { userService } from "../../../services/index.js";
import { StatusError, envs } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { v4 as uuidv4 } from "uuid";
import { Customer } from "../../../models/Customer.js";
import { MAIL_TEMPLATE } from "../../../utils/constants.js";

/**
 * customerList
 * User can get customerList with details
 * @param req
 * @param res
 * @param next
 */
export const customerList = async (req, res, next) => {
  try {
    const { page = 1, limit = 2 } = req.body;

    const pageNumber = parseInt(page);
    const pageSize = parseInt(limit);

    // Optional: add search/filter conditions
    let condition = {
      status: "active",
      created_by: req.userDetails.userId
    };

    // Count total documents
    const totalRecords = await Customer.countDocuments(condition);

    // Fetch paginated data
    const customers = await Customer.find(condition)
      .sort({ createdAt: -1 }) // Sort by latest
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .lean(); // faster and returns plain JS objects

    const results = customers.map(customer => {
    const dob = customer.date_of_birth
        ? new Date(customer.date_of_birth).toLocaleDateString("en-US") // 👉 formats as MM/DD/YYYY
        : null;

    return { 
        id: customer._id,
        name: customer.customer_name,
        email: customer.customer_email,
        mobile: customer.customer_mobile,
        dob: dob,
        points: customer.customer_points,
        zipcode: customer.customer_zipcode,
        address: customer.customer_address,
        sms_email_promotions: customer.sms_email_promotions,
        status: customer.status,
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
