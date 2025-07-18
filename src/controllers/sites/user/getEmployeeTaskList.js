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
    const employeeId = req.params.id;

    // Optional: add search/filter conditions
    let condition = {
      status: "active",
      employee_id: employeeId,
    };

    // Count total documents
    const totalRecords = await EmployeeTask.countDocuments(condition);
    if (totalRecords === 0) {
     throw StatusError.badRequest("Invalid employee: not found or inactive");
    }

    // Fetch paginated data
    const employeeTasks = await EmployeeTask.find(condition)
      .sort({ createdAt: -1 }) // Sort by latest
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .lean(); // faster and returns plain JS objects

    // Optional: format data
    const results = employeeTasks.map(data => {
    const task_deadline = data.task_deadline
        ? new Date(data.task_deadline).toLocaleDateString("en-US") // 👉 formats as MM/DD/YYYY
        : null;

    return {
        id: data._id,
        title: data.task_title,
        task_details: data.task_details,
        task_deadline: task_deadline,
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