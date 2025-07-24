import { Deal } from "../../../models/Deal.js";

export const deleteDeal = async (req, res, next) => {
  try {
    const dealId = req.params.id;

    const loyaltyDeal = await Deal.findOne({
      _id: dealId,
      status: 'active',
      business_id: req.userDetails.business_id
    });

    if (!loyaltyDeal) {
      return res.status(404).json({ message: "Deal not found" });
    }

    loyaltyDeal.status = "inactive";
    loyaltyDeal.updated_by = req.userDetails.userId;
    await loyaltyDeal.save();

    return res.ok({
      message: "Deal deleted successfully",
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};