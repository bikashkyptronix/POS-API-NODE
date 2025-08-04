import { User } from "../../../models/User.js";

export const bulkDeleteEmployee = async (req, res, next) => {
  try {
    const { employeeIds } = req.body; // Expecting an array of IDs

    if (!Array.isArray(employeeIds) || employeeIds.length === 0) {
      return res.status(400).json({ message: "No employee IDs provided" });
    }

    const result = await User.updateMany(
      {
        _id: { $in: employeeIds },
        status: "active",
        role: "staff",
        owner_business_id: req.userDetails.business_id
      },
      {
        $set: {
          status: "inactive",
          updated_by: req.userDetails.userId
        }
      }
    );

    return res.ok({
      message: `${result.modifiedCount} employee deleted successfully`,
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};