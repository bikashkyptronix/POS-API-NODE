import { User } from "../../../models/User.js";

export const bulkDeleteVendor = async (req, res, next) => {
  try {
    const { vendorIds } = req.body; // Expecting an array of IDs

    if (!Array.isArray(vendorIds) || vendorIds.length === 0) {
      return res.status(400).json({ message: "No vendor IDs provided" });
    }

    const result = await User.updateMany(
      {
        _id: { $in: vendorIds },
        status: "active",
        role: "vendor",
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
      message: `${result.modifiedCount} vendor deleted successfully`,
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};