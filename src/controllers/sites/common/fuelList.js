import bcrypt from "bcrypt";
import { userService } from "../../../services/index.js";
import { StatusError, envs } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { v4 as uuidv4 } from "uuid";
import { Fuel } from "../../../models/Fuel.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * fuelList
 * User can get fuelList with details
 * @param req
 * @param res
 * @param next
 */
export const fuelList = async (req, res, next) => {
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
    const totalRecords = await Fuel.countDocuments(condition);

    // Fetch paginated data
    const getData = await Fuel.find(condition)
      .sort({ createdAt: -1 }) // Sort by latest
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .lean(); // faster and returns plain JS objects

    // Optional: format data
    const results = getData.map(data => {
        const createdAt = dayjs(data.created_at).utc().tz("Asia/Kolkata");
        const formattedTime = createdAt.format("hh:mm A");
        return {
            id: data._id,
            business_id: data.business_id,
            regular_cash: data.regular_cash,
            regular_credit: data.regular_credit,
            plus_cash: data.plus_cash,
            plus_credit: data.plus_credit,
            premium_cash: data.premium_cash,
            premium_credit: data.premium_credit,
            diesel_cash: data.diesel_cash,
            diesel_credit: data.diesel_credit,
            date: createdAt.format("DD.MM.YYYY"),      // 18.07.2025
            time: createdAt.format("hh:mm A"),          // 10:15 AM/PM
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