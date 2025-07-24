import { userService } from "../../../services/index.js";
import { StatusError, envs } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { v4 as uuidv4 } from "uuid";
import { EmployeeTask } from "../../../models/EmployeeTask.js";
import { MAIL_TEMPLATE } from "../../../utils/constants.js";

export const employeeTaskDetails = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const getTaskData = await EmployeeTask.findOne({
      _id: taskId,
      status: "active",
      business_id: req.userDetails.business_id
    }).lean();

    if (!getTaskData) {
      return res.status(404).json({ message: "Task not found" });
    }

    const result = {
      id: getTaskData._id,
      employee_id: getTaskData.employee_id,
      task_title: getTaskData.task_title,
      task_details: getTaskData.task_details,
      task_deadline: getTaskData.task_deadline,
      business_id: getTaskData.business_id,
      task_status: getTaskData.task_status,
      status: getTaskData.status,
      created_at: getTaskData.createdAt,
      updated_at: getTaskData.updatedAt
    };

    return res.ok({
      message: "Task details fetched successfully",
      product: result
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};