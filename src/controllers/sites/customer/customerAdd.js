import bcrypt from "bcrypt";
import { userService } from "../../../services/index.js";
import { StatusError, envs } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { v4 as uuidv4 } from "uuid";
import { Customer } from "../../../models/Customer.js";
import { MAIL_TEMPLATE } from "../../../utils/constants.js";

/**
 * customerAdd
 * User can customerAdd with details
 * @param req
 * @param res
 * @param next
 */
export const customerAdd = async (req, res, next) => {

  try {
    const reqBody = req.body;
    const userId = req.userDetails.userId;
    const {
    customer_name,
    customer_email,
    customer_mobile,
    date_of_birth,
    customer_address,
    customer_zipcode,
    customer_points,
    sms_email_promotions,
    } = req.body;

    const userDetails = await Customer.findOne({ customer_email });
    if (userDetails) throw StatusError.badRequest("This email is already registered");

    const existingPhoneUser = await Customer.findOne({ customer_mobile });
    if (existingPhoneUser) {
        throw StatusError.badRequest("This phone number is already registered");
    }

    const customerData = new Customer({
    customer_name,
    customer_email,
    customer_mobile,
    date_of_birth,
    customer_address,
    customer_zipcode,
    customer_points,
    sms_email_promotions,
    business_id: req.userDetails.business_id || null,
    status: "active",
    created_by: req.userDetails.userId,
    updated_by: req.userDetails.userId,
    });

    const savedCustomer = await customerData.save();

      const insertedId = savedCustomer._id;
      if(insertedId)
      {
          res.ok({
          message: "Customer created successfully",
          user: customerData
        });
      } else {
       throw StatusError.badRequest(res.__("serverError"));
      }
     
    } catch (error) {
        console.log(error);
      next(error);
    }
};
