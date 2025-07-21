import bcrypt from "bcrypt";
import { userService } from "../../../services/index.js";
import { StatusError, envs } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { v4 as uuidv4 } from "uuid";
import { Device } from "../../../models/Device.js";
import dayjs from "dayjs";

/**
 * deviceList
 * User can get deviceList with details
 * @param req
 * @param res
 * @param next
 */
export const deviceList = async (req, res, next) => {
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
    const totalRecords = await Device.countDocuments(condition);

    // Fetch paginated data
    const getData = await Device.find(condition)
      .sort({ createdAt: -1 }) // Sort by latest
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .lean(); // faster and returns plain JS objects

    // Optional: format data
    const results = getData.map(data => {
        const createdAt = dayjs(data.created_at);
        return {
            id: data._id,
            business_id: data.business_id,
            device_name: data.device_name,
            location: data.location,
            device_type: data.device_type,
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