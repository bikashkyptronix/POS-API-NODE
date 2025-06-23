import { celebrate, Joi, Segments } from "celebrate";

export const productAdd = celebrate({
  [Segments.BODY]: Joi.object({
    product_name: Joi.string().trim().required(),
    category_id: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .optional()
      .allow(null, ""),
    product_sku: Joi.string().trim().optional().allow(null, ""),
    product_quantity: Joi.number()
      .integer()
      .min(0)
      .optional()
      .allow(null, "")
      .messages({
        'number.base': 'product_quantity must be a number'
      }),
    for_sale: Joi.string()
      .valid("yes", "no")
      .required(),
    purchase_price: Joi.number()
      .min(0)
      .required()
      .messages({
        'number.base': 'purchase_price must be a number'
      }),
    selling_price: Joi.number()
      .min(0)
      .required()
      .messages({
        'number.base': 'selling_price must be a number'
      }),
    tax_percentage: Joi.number()
      .min(0)
      .max(100)
      .optional()
      .allow(null, "")
      .messages({
        'number.base': 'tax_percentage must be a number between 0 and 100'
      }),
    business_id: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .optional()
      .allow(null, ""),
    status: Joi.string()
      .valid("active", "inactive")
      .optional()
  }).prefs({ convert: true }) // Enables type coercion from strings (e.g., from form-data)
});
