import { celebrate, Joi } from "celebrate";

export const testDatacheck = celebrate({
  body: Joi.object({
    first_name: Joi.string().trim().required(),
  last_name: Joi.string().trim().required(),
  email: Joi.string().email().lowercase().trim().required(),
  password: Joi.string().min(6).required(), // Plain password from request body
  role: Joi.string().valid("superadmin", "client", "staff").required(),
  business_id: Joi.string().optional().allow(null), // ObjectId as string or null
  phone: Joi.string().optional().allow(""),
  address: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zip: Joi.string().pattern(/^\d{5}$/).required(), // or Joi.string().required()
  }).optional(),
  status: Joi.string().valid("active", "in-active").optional(),
  permissions: Joi.array().items(Joi.string()).optional(),
  }),
});
