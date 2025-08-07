import bcrypt from "bcrypt";
import { userService } from "../../../services/index.js";
import { StatusError, envs } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { v4 as uuidv4 } from "uuid";
import { EmployeeTask } from "../../../models/EmployeeTask.js";
import { MAIL_TEMPLATE } from "../../../utils/constants.js";

/**
 * getEmployeeTaskList
 * User can get getEmployeeTaskList with details
 * @param req
 * @param res
 * @param next
 */
export const getEmployeeTaskList = async (req, res, next) => {
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
    const totalRecords = await EmployeeTask.countDocuments(condition);
    if (totalRecords === 0) {
     throw StatusError.badRequest("Invalid employee: not found or inactive");
    }

    // Fetch paginated data
    const employeeTasks = await EmployeeTask.aggregate([
      {
        $match: condition, // Apply your filter condition
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $skip: (pageNumber - 1) * pageSize,
      },
      {
        $limit: pageSize,
      },
      {
        $lookup: {
          from: "users", // collection to join
          localField: "employee_id", // field from employeetasks
          foreignField: "_id", // field from users
          as: "employee_info"
        }
      },
      {
        $unwind: {
          path: "$employee_info",
          preserveNullAndEmptyArrays: true // in case no matching user
        }
      },
      {
        $project: {
          _id: 1,
          task_title: 1,
          employee_id: 1,
          task_details: 1,
          task_deadline: 1,
          task_status: 1,
          createdAt: 1,
          updatedAt: 1,
          "employee_full_name": "$employee_info.full_name" // project employee full name
        }
      }
    ]);

    // Optional: format data
    const results = employeeTasks.map(data => {
      const task_deadline = data.task_deadline
          ? new Date(data.task_deadline).toLocaleDateString("en-US") // 👉 formats as MM/DD/YYYY
          : null;

      return {
        id: data._id,
        title: data.task_title,
        employee_id: data.employee_id,
        employee_name: data.employee_full_name || "N/A",
        task_details: data.task_details,
        task_deadline,
        task_status: data.task_status,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
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