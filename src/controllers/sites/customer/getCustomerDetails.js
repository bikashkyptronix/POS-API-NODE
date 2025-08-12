import { userService } from "../../../services/index.js";
import { StatusError, envs } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { v4 as uuidv4 } from "uuid";
import { Customer } from "../../../models/Customer.js";
import { MAIL_TEMPLATE } from "../../../utils/constants.js";

export const getCustomerDetails = async (req, res, next) => {
  try {
    const customerId = req.params.id;

    const customer_data = await Customer.findOne({
      _id: customerId,
      status: "active",
      business_id: req.userDetails.business_id
    }).lean();

    if (!customer_data) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const result = {
      id: customer_data._id,
      customer_name: customer_data.customer_name,
      customer_email: customer_data.customer_email,
      customer_mobile: customer_data.customer_mobile,
      date_of_birth: customer_data.date_of_birth,
      customer_address: customer_data.customer_address,
      customer_zipcode: customer_data.customer_zipcode,
      customer_points: customer_data.customer_points,
      sms_email_promotions: customer_data.sms_email_promotions,
      status: customer_data.status,
      created_at: customer_data.createdAt,
      updated_at: customer_data.updatedAt
    };

    return res.ok({
      message: "Customer details fetched successfully",
      product: result
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};