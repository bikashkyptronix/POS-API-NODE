import { celebrate, Joi, Segments } from "celebrate";

export const deviceUpdate = celebrate({
  [Segments.BODY]: Joi.object({ 
    device_name: Joi.string().trim().required(),
    location: Joi.string().trim().required(),
    device_type: Joi.string().trim().required(),
    business_id: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .optional()
      .allow(null, ""),
    status: Joi.string()
      .valid("active", "inactive")
      .optional()
  }).prefs({ convert: true }) // Enables type coercion from strings (e.g., from form-data)
});