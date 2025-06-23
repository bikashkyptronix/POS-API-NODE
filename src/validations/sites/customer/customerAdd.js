import { celebrate, Joi, Segments } from "celebrate";

export const customerAdd = celebrate({
  [Segments.BODY]: Joi.object({
    customer_name: Joi.string().trim().required(),
    customer_email: Joi.string().trim().required(),
    customer_mobile: Joi.string().trim().required(),
    date_of_birth: Joi.date().optional().allow(null, ''),
    customer_address: Joi.string().trim().required(),
    customer_zipcode: Joi.string().trim().required(),
    customer_points: Joi.number().optional().allow(null, '').min(0),
    sms_email_promotions: Joi.string().valid('yes', 'no').optional().allow(null, ''),
    business_id: Joi.string()
          .pattern(/^[0-9a-fA-F]{24}$/)
          .optional()
          .allow(null, ""),
    status: Joi.string()
      .valid("active", "inactive")
      .optional()
  }).prefs({ convert: true }) // Enables type coercion from strings (e.g., from form-data)
});
