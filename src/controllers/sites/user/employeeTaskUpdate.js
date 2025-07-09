import { EmployeeTask } from "../../../models/EmployeeTask.js";
import { User } from "../../../models/User.js";
import { StatusError } from "../../../config/index.js";

/**
 * employeeTaskUpdate
 * Update a task to an employee
 * @param req
 * @param res
 * @param next
 */
export const employeeTaskUpdate = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const {
      employee_id,
      task_title,
      task_details,
      task_deadline,
      status,
    } = req.body;

    // Check if the task exists and belongs to the employee
    const existingTask = await EmployeeTask.findOne({
      _id: taskId,
      employee_id: employee_id,
    });

    if (!existingTask) {
      throw StatusError.notFound("Task not found for the specified employee");
    }

    // Update fields
    existingTask.task_title = task_title || existingTask.task_title;
    existingTask.task_details = task_details || existingTask.task_details;
    existingTask.task_deadline = task_deadline || existingTask.task_deadline;
    existingTask.status = status || existingTask.status;
    existingTask.updated_by = req.userDetails.userId;

    const updatedTask = await existingTask.save();

    res.ok({
      message: "Task updated successfully",
      task: updatedTask,
    });

  } catch (error) {
    console.error("Task update error:", error);
    next(error);
  }
};