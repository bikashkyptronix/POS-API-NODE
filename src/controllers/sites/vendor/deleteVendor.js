import { User } from "../../../models/User.js";

export const deleteVendor = async (req, res, next) => {
  try {
    const vendorId = req.params.id;

    const vendor = await User.findOne({
      _id: vendorId,
      status: "active",
      role: "vendor",
      owner_business_id: req.userDetails.business_id
    });

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    vendor.status = "inactive";
    vendor.updated_by = req.userDetails.userId;
    await vendor.save();

    return res.ok({
      message: "Vendor deleted successfully",
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};