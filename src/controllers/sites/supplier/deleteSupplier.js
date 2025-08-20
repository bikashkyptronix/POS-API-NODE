import { User } from "../../../models/User.js";

export const deleteSupplier = async (req, res, next) => {
  try {
    const supplierId = req.params.id;

    const supplierDetails = await User.findOne({
      _id: supplierId,
      status: "active",
      role: "supplier",
      owner_business_id: req.userDetails.business_id
    });

    if (!supplierDetails) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    supplierDetails.status = "inactive";
    supplierDetails.updated_by = req.userDetails.userId;
    await supplierDetails.save();

    return res.ok({
      message: "Supplier deleted successfully",
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};