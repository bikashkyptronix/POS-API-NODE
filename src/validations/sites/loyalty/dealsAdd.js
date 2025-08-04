import { celebrate, Joi, Segments } from "celebrate";

export const dealsAdd = celebrate({
  [Segments.BODY]: Joi.object({
    item_id: Joi.string().trim().required(),
    // promocode: only digits allowed, leading zeros preserved
    promocode: Joi.string()
      .pattern(/^\d+$/)
      .trim()
      .required(),
    // Dates in YYYY-MM-DD format only
    from_date: Joi.string()
    .pattern(/^\d{2}\.\d{2}\.\d{4}$/)
    .required()
    .messages({
        "string.pattern.base": "from_date must be in DD.MM.YYYY format",
    }),
    to_date: Joi.string()
    .pattern(/^\d{2}\.\d{2}\.\d{4}$/)
    .optional()
    .allow(null, "")
    .messages({
        "string.pattern.base": "to_date must be in DD.MM.YYYY format",
    }),
    amount_off: Joi.number().required().min(0),
    minimum_quantity: Joi.number().optional().allow(null, "").min(0),
    maximum_quantity: Joi.number().optional().allow(null, "").min(0),
    status: Joi.string().valid("active", "inactive").optional()
  }).prefs({ convert: true }) // Convert string values to numbers/dates if possible
});