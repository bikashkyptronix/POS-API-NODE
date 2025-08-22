import { Purchase } from "../../../models/Purchase.js";
import { StatusError } from "../../../config/index.js";

export const purchaseUpdate = async (req, res, next) => {
  try {
    const purchaseId = req.params.id; // from route params
    const userId = req.userDetails.userId;

    // Find existing purchase
    const existingPurchase = await Purchase.findById(purchaseId);
    if (!existingPurchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    // Unique check for purchase_id (only if provided in body)
    if (req.body.purchase_id) {
      const duplicate = await Purchase.findOne({
        purchase_id: req.body.purchase_id,
        _id: { $ne: purchaseId }, // exclude current record
      });

      if (duplicate) {
        return res.status(400).json({ message: "Purchase ID already exists" });
      }
    }

    // Build update data
    const updateData = {
      ...req.body,
      updated_by: userId,
    };

    // Handle new invoice upload
    if (req.file) {
      updateData.purchase_invoice_image = req.file.path; // Cloudinary URL
    }

    // Update and return updated doc
    const updatedPurchase = await Purchase.findByIdAndUpdate(
      purchaseId,
      { $set: updateData },
      { new: true }
    );

    res.ok({
      message: "Purchase updated successfully",
      purchase: updatedPurchase,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};