import { User } from "../../../models/User.js";

export const bulkDeleteSupplier = async (req, res, next) => {
  try {
    const { supplierIds } = req.body; // Expecting an array of IDs

    if (!Array.isArray(supplierIds) || supplierIds.length === 0) {
      return res.status(400).json({ message: "No supplier IDs provided" });
    }

    const result = await User.updateMany(
      {
        _id: { $in: supplierIds },
        status: "active",
        role: "supplier",
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
      message: `${result.modifiedCount} supplier deleted successfully`,
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};