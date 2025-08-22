import { Purchase } from "../../../models/Purchase.js";

export const getPurchaseDetail = async (req, res, next) => {
  try {
    const purchaseId = req.params.id;

    // 1. Find purchase by ID and business
    const purchase = await Purchase.findOne({
      _id: purchaseId,
      status: "active",
      business_id: req.userDetails.business_id
    })
    .populate("vendor_id", "full_name")
    .lean();

    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    const result = {
      id: purchase._id,
      due_date: purchase.due_date,
      vendor_id: purchase.vendor_id?._id || null,
      vendor_name: purchase.vendor_id?.full_name || null,
      invoice_number: purchase.invoice_number,
      purchase_description: purchase.purchase_description,
      purchase_pay_amount: purchase.purchase_pay_amount,
      purchase_invoice_image: purchase.purchase_invoice_image,
      business_id: purchase.business_id,
      status: purchase.status,
      created_at: purchase.createdAt,
      updated_at: purchase.updatedAt
    };

    return res.ok({
      message: "Purchase details fetched successfully",
      purchase: result
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};