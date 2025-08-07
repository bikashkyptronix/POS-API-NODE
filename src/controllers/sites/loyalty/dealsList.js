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
    const dealsList = await Deal.aggregate([
      { $match: condition },
      { $sort: { createdAt: -1 } },
      { $skip: (pageNumber - 1) * pageSize },
      { $limit: pageSize },
      {
        $lookup: {
          from: "products",               // collection name to join with
          localField: "item_id",          // field in Deal collection
          foreignField: "_id",            // matching field in Product collection
          as: "product_info"
        }
      },
      {
        $unwind: {
          path: "$product_info",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 1,
          item_id: 1,
          promocode: 1,
          item_name: 1,
          customer_mobile: 1,
          from_date: 1,
          to_date: 1,
          amount_off: 1,
          minimum_quantity: 1,
          maximum_quantity: 1,
          status: 1,
          product_name: "$product_info.product_name"
        }
      }
    ]);

    const results = dealsList.map(data => {
        const from_date = data.from_date
            ? new Date(data.from_date).toLocaleDateString("en-GB").replace(/\//g, ".")
            : null;

        const to_date = data.to_date
            ? new Date(data.to_date).toLocaleDateString("en-GB").replace(/\//g, ".")
            : null;

        return {
          id: data._id,
          item_id: data.item_id,
          item_name: data.product_name || "N/A",
          name: data.item_name,
          promocode: data.promocode,
          mobile: data.customer_mobile,
          from_date,
          to_date,
          amount_off: data.amount_off,
          minimum_quantity: data.minimum_quantity,
          maximum_quantity: data.maximum_quantity,
          status: data.status
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