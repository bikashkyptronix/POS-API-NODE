import { Purchase } from "../../../models/Purchase.js";
import { StatusError } from "../../../config/index.js";

export const purchaseAdd = async (req, res, next) => {
  try {
    const userId = req.userDetails.userId;

    // Unique check for purchase_id (only if provided in body)
    if (req.body.purchase_id) {
        const duplicate = await Purchase.findOne({
          purchase_id: req.body.purchase_id
        });

        if (duplicate) {
           return res.status(400).json({ message: "Purchase ID already exists" });
        }
    }

    // Build purchase data
    const purchaseData = {
      ...req.body,
      business_id: req.userDetails.business_id || null,
      created_by: userId,
      updated_by: userId,
    };

    // Save uploaded file URL if present
    if (req.file) {
      purchaseData.purchase_invoice_image = req.file.path; // Cloudinary auto-sets .path to secure_url
    }

    // Save Purchase
    const newPurchase = new Purchase(purchaseData);
    const savedPurchase = await newPurchase.save();

    res.ok({
      message: "Purchase data saved successfully",
      purchase: savedPurchase,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};