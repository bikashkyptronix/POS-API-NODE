import bcrypt from "bcrypt";
import { userService } from "../../../services/index.js";
import { StatusError, envs } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { v4 as uuidv4 } from "uuid";
import { Deal } from "../../../models/Deal.js";
import { Product } from "../../../models/Product.js";
import { MAIL_TEMPLATE } from "../../../utils/constants.js";
import mongoose from "mongoose";

/**
 * dealsAdd
 * User can dealsAdd with details
 * @param req
 * @param res
 * @param next
 */
export const dealsAdd = async (req, res, next) => {

  try {

    const convertToDate = (dateStr) => {
      if (!dateStr) return null;
      const [day, month, year] = dateStr.split(".");
      return new Date(`${year}-${month}-${day}`);
    };

    const reqBody = req.body;
    const userId = req.userDetails.userId;
    const {
    item_id,
    promocode,
    from_date,
    to_date,
    amount_off,
    minimum_quantity,
    maximum_quantity,
    status,
    } = req.body;

    const existingProduct = await Product.findOne({
      _id: mongoose.Types.ObjectId.createFromHexString(item_id),
      status: "active"
    });

    if (!existingProduct) {
      return res.status(404).json({ message: "Selected Item not found" });
    }

    const promocodeExist = await Deal.findOne({
        promocode: req.body.promocode,
        business_id: req.userDetails.business_id,
    });

    if (promocodeExist) {
       throw StatusError.badRequest("This promocode is already registered for this business");
    }


    const dealData = new Deal({
    item_id,
    promocode,
    from_date: convertToDate(req.body.from_date),
    to_date: convertToDate(req.body.to_date),
    amount_off,
    minimum_quantity,
    maximum_quantity,
    status,
    business_id: req.userDetails.business_id || null,
    created_by: req.userDetails.userId,
    updated_by: req.userDetails.userId,
    });

    const savedDeal = await dealData.save();

      const insertedId = savedDeal._id;
      if(insertedId)
      {
        res.ok({
          message: "Deal created successfully",
          dealData: dealData
        });
      } else {
       throw StatusError.badRequest(res.__("serverError"));
      }
     
    } catch (error) {
        console.log(error);
      next(error);
    }
};
