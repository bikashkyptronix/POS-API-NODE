import { userService } from "../../../services/index.js";
import { StatusError, envs } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { v4 as uuidv4 } from "uuid";
import { Deal } from "../../../models/Deal.js";
import { MAIL_TEMPLATE } from "../../../utils/constants.js";

export const getDealDetails = async (req, res, next) => {
  try {
    const dealId = req.params.id;
    const getDeal = await Deal.findOne({
      _id: dealId,
      status: "active",
      business_id: req.userDetails.business_id
    }).lean();

    if (!getDeal) {
      return res.status(404).json({ message: "Deal not found" });
    }

    const result = {
      id: getDeal._id,
      item_name: getDeal.item_name,
      promocode: getDeal.promocode,
      from_date: getDeal.from_date,
      to_date: getDeal.to_date,
      amount_off: getDeal.amount_off,
      minimum_quantity: getDeal.minimum_quantity,
      maximum_quantity: getDeal.maximum_quantity,
      status: getDeal.status,
      created_at: getDeal.createdAt,
      updated_at: getDeal.updatedAt
    };

    return res.ok({
      message: "Deal details fetched successfully",
      product: result
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};