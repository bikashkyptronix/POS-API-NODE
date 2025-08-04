import moment from "moment-timezone";
import { Fuel } from "../../../models/Fuel.js";
// ... other imports

export const fuelUpdate = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const userId = req.userDetails.userId;
    const {
      regular_cash,
      regular_credit,
      plus_cash,
      plus_credit,
      premium_cash,
      premium_credit,
      diesel_cash,
      diesel_credit,
    } = req.body;

    // Detect timezone — fallback to 'Asia/Kolkata' (India) if not sent
    const timezone = req.headers["x-timezone"] || "Asia/Kolkata";

    const now = moment().tz(timezone).toDate(); // convert to timezone then to JS Date

    const updatedFuel = new Fuel({
      regular_cash,
      regular_credit,
      plus_cash,
      plus_credit,
      premium_cash,
      premium_credit,
      diesel_cash,
      diesel_credit,
      status: "active",
      business_id: req.userDetails.business_id || null,
      created_by: userId,
      updated_by: userId,
      created_at: now,
      updated_at: now
    });

    const savedFuel = await updatedFuel.save();

    if (savedFuel?._id) {
      res.ok({
        message: "Fuel updated successfully",
        fuelDetails: savedFuel
      });
    } else {
      throw StatusError.badRequest(res.__("serverError"));
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};