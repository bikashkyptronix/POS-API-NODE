import bcrypt from "bcrypt";
import { userService } from "../../../services/index.js";
import { StatusError, envs } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { v4 as uuidv4 } from "uuid";
import { Fuel } from "../../../models/Fuel.js";
import { MAIL_TEMPLATE } from "../../../utils/constants.js";

/**
 * fuelUpdate
 * User can fuelUpdate with details
 * @param req
 * @param res
 * @param next
 */
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
        created_by: req.userDetails.userId,
        updated_by: req.userDetails.userId,
        });

        const savedFuel = await updatedFuel.save();

      const insertedId = savedFuel._id;
      if(insertedId)
      {
        res.ok({
          message: "Fuel updated successfully",
          fuelDetails: updatedFuel
        });
      } else {
       throw StatusError.badRequest(res.__("serverError"));
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
};