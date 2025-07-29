import { User } from "../../../models/User.js";

export const deleteEmployee = async (req, res, next) => {
  try {
    const employeeId = req.params.id;

    const employee = await User.findOne({
      _id: employeeId,
      role: "staff",
      owner_business_id: req.userDetails.business_id
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    employee.status = "inactive";
    employee.updated_by = req.userDetails.userId;
    await employee.save();

    return res.ok({
      message: "Employee deleted successfully",
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};
