import { Customer } from "../../../models/Customer.js";

export const bulkDeleteCustomer = async (req, res, next) => {
  try {
    const { customerIds } = req.body; // Expecting an array of IDs

    if (!Array.isArray(customerIds) || customerIds.length === 0) {
      return res.status(400).json({ message: "No customer IDs provided" });
    }

    const result = await Customer.updateMany(
      {
        _id: { $in: customerIds },
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
      message: `${result.modifiedCount} customers deleted successfully`,
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};