import { celebrate, Joi, Segments } from "celebrate";

export const purchaseUpdate = celebrate({
  [Segments.BODY]: Joi.object({
    purchase_id: Joi.string().trim().required(),
    vendor_id: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .optional()
      .allow(null, ""),
    due_date: Joi.string().trim().required(),  
    invoice_number: Joi.string().trim().required(),
    purchase_description: Joi.string().trim().required(),
    purchase_pay_amount: Joi.number()
      .min(0)
      .precision(2) // allows up to 2 decimal places
      .required()
      .messages({
        'number.base': 'product_price must be a number',
        'number.precision': 'product_price must have at most 2 decimal places'
    }),
    status: Joi.string()
      .valid("active", "inactive")
      .optional()
  }).prefs({ convert: true }) // Enables type coercion from strings (e.g., from form-data)
});