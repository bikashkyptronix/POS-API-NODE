import bcrypt from "bcrypt";
import { userService } from "../../../services/index.js";
import { StatusError, envs } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { v4 as uuidv4 } from "uuid";
import { Deal } from "../../../models/Deal.js";
import { MAIL_TEMPLATE } from "../../../utils/constants.js";

/**
 * dealsUpdate
 * User can dealsUpdate with details
 * @param req
 * @param res
 * @param next
 */
export const dealsUpdate = async (req, res, next) => {
  try {

    const convertToDate = (dateStr) => {
      if (!dateStr) return null;
      const [day, month, year] = dateStr.split(".");
      return new Date(`${year}-${month}-${day}`);
    };

    const dealId = req.params.id;
    const {
      item_name,
      promocode,
      from_date,
      to_date,
      amount_off,
      minimum_quantity,
      maximum_quantity,
      status
    } = req.body;

    const existingDeal = await Deal.findOne({
      _id: dealId,
      business_id: req.userDetails.business_id
    });

    if (!existingDeal) {
      return res.status(404).json({ message: "Deal not found" });
    }

    // Update fields
    existingDeal.item_name = item_name;
    existingDeal.promocode = promocode;
    existingDeal.from_date= convertToDate(req.body.from_date);
    existingDeal.to_date= convertToDate(req.body.to_date);
    existingDeal.amount_off = amount_off;
    existingDeal.minimum_quantity = minimum_quantity;
    existingDeal.maximum_quantity = maximum_quantity;
    existingDeal.status = status;
    existingDeal.updated_by = req.userDetails.userId;

    await existingDeal.save();

    return res.ok({
      message: "Deal updated successfully",
      dealData: existingDeal
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};