import { EmployeeTask } from "../../../models/EmployeeTask.js";

export const deleteEmployeeTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;

    const taskDetails = await EmployeeTask.findOne({
      _id: taskId,
      status: 'active',
      business_id: req.userDetails.business_id
    });

    if (!taskDetails) {
      return res.status(404).json({ message: "Task not found" });
    }

    taskDetails.status = "inactive";
    taskDetails.updated_by = req.userDetails.userId;
    await taskDetails.save();

    return res.ok({
      message: "Task deleted successfully",
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};