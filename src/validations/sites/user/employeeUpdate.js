import { celebrate, Joi } from "celebrate";
import { validationHelper } from "../../../helpers/index.js";

export const employeeUpdate = celebrate({
  body: Joi.object({
    full_name: Joi.string().trim().required(),
    email: Joi.string().email().lowercase().trim().required(),
    role: Joi.string().valid("staff").required(),
    staff_position: Joi.string().optional().allow(null, ''),
    phone: Joi.string().optional().allow(""),
    date_of_birth: Joi.date().optional().allow(null, ''),
    address: Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zip: Joi.string().pattern(/^\d{6}$/).required(), // or Joi.string().required()
    }).optional()
  }),
});