import { celebrate, Joi } from "celebrate";
import { validationHelper } from "../../../helpers/index.js";

export const vendorUpdate = celebrate({
  body: Joi.object({
    full_name: Joi.string().trim().required(),
    email: Joi.string().email().lowercase().trim().required(),
    role: Joi.string().valid("vendor").required(),
    phone: Joi.string().optional().allow(""),
    address: Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zip: Joi.string().pattern(/^\d{6}$/).required(), // or Joi.string().required()
    }).optional(),
    status: Joi.string().valid("active", "inactive").optional(),
  }),
});