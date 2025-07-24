import { EmployeeTask } from "../../../models/EmployeeTask.js";
import { User } from "../../../models/User.js";
import { StatusError } from "../../../config/index.js";

/**
 * employeeTaskAssign
 * Assigns a task to an employee
 * @param req
 * @param res
 * @param next
 */
export const employeeTaskAssign = async (req, res, next) => {
  try {
    const {
      employee_id,
      task_title,
      task_details,
      task_deadline,
      created_by,
      task_status,
    } = req.body;

    const employeeExists = await User.findOne({
      _id: employee_id,
      status: "active",
    });

    if (!employeeExists) {
      throw StatusError.badRequest("Invalid employee: not found or inactive");
    }

    const task = new EmployeeTask({
      employee_id,
      task_title,
      task_details,
      task_deadline: task_deadline || null,
      business_id: req.userDetails.business_id || null,
      created_by: created_by || req.userDetails.userId,
      task_status: task_status || "pending",
    });

    const savedTask = await task.save();

    if (!savedTask || !savedTask._id) {
      throw StatusError.badRequest("Failed to assign task");
    }

    res.ok({
      message: "Task assigned successfully",
      task: savedTask,
    });

  } catch (error) {
    console.error("Task assignment error:", error);
    next(error);
  }
};