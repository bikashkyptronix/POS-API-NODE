import { EmployeeTask } from "../../../models/EmployeeTask.js";

export const bulkDeleteEmployeeTask = async (req, res, next) => {
  try {
    const { employeeTaskIds } = req.body; // Expecting an array of IDs

    if (!Array.isArray(employeeTaskIds) || employeeTaskIds.length === 0) {
      return res.status(400).json({ message: "No task IDs provided" });
    }

    const result = await EmployeeTask.updateMany(
      {
        _id: { $in: employeeTaskIds },
        status: "active",
        business_id: req.userDetails.business_id
      },
      {
        $set: {
          status: "inactive",
          updated_by: req.userDetails.userId
        }
      }
    );

    return res.ok({
      message: `${result.modifiedCount} employee task deleted successfully`,
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};