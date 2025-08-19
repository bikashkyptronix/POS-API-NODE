import { celebrate, Joi } from "celebrate";
import { validationHelper } from "../../../helpers/index.js";

export const employeeAdd = celebrate({
  body: Joi.object({
    full_name: Joi.string().trim().required(),
    email: Joi.string().email().lowercase().trim().required(),
    log_userId: Joi.string()
      .trim()
      .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/)
      .message(
        "log_userId must be at least 6 characters long, include at least one letter, one number, and one special character"
      )
      .required(),
    password: Joi.string().min(6).required(), // Plain password from request body
    role: Joi.string().valid("staff").required(),
    staff_position: Joi.string().optional().allow(null, ''),
    phone: Joi.string().optional().allow(""),
    date_of_birth: Joi.date().optional().allow(null, ''),
    address: Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zip: Joi.string().pattern(/^\d{6}$/).required(), // or Joi.string().required()
    }).optional(),
    created_by: Joi.string().optional().allow(null),
    status: Joi.string().valid("active", "inactive").optional(),
    permissions: Joi.array().items(Joi.string()).optional(),
  }),
});