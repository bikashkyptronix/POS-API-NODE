import { Fuel } from "../../../models/Fuel.js";

export const lastFuelDetails = async (req, res, next) => {
  try {

    const getFuel = await Fuel.findOne({
        status: "active",
        business_id: req.userDetails.business_id
    })
    .sort({ created_at: -1 })  // Sort by newest first
    .lean();

    if (!getFuel) {
      return res.status(404).json({ message: "Fuel not found" });
    }

    const result = {
      id: getFuel._id,
      regular_cash: getFuel.regular_cash,
      regular_credit: getFuel.regular_credit,
      plus_cash: getFuel.plus_cash,
      plus_credit: getFuel.plus_credit,
      premium_cash: getFuel.premium_cash,
      premium_credit: getFuel.premium_credit,
      diesel_cash: getFuel.diesel_cash,
      diesel_credit: getFuel.diesel_credit,
      status: getFuel.status,
      created_at: getFuel.createdAt,
      updated_at: getFuel.updatedAt
    };

    return res.ok({
      message: "Fuel details fetched successfully",
      fuelDetails: result
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};