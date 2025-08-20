import { celebrate, Joi } from "celebrate";
import { validationHelper } from "../../../helpers/index.js";

export const supplierAdd = celebrate({
  body: Joi.object({
    full_name: Joi.string().trim().required(),
    email: Joi.string().email().lowercase().trim().required(),
    password: Joi.string().min(6).required(), // Plain password from request body
    role: Joi.string().valid("supplier").required(),
    phone: Joi.string().optional().allow(""), 
    supplier_choose_cat_id: Joi.string()
          .pattern(/^[0-9a-fA-F]{24}$/)
          .optional()
          .allow(null, ""),
    address: Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zip: Joi.string().pattern(/^\d{6}$/).required(), // or Joi.string().required()
    }).optional(),
    created_by: Joi.string().optional().allow(null),
    status: Joi.string().valid("active", "inactive").optional()
  }),
});