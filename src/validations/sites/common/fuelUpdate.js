import { celebrate, Joi } from "celebrate";
import { validationHelper } from "../../../helpers/index.js";

export const fuelUpdate = celebrate({
  body: Joi.object({
    regular_cash: Joi.string()
    .pattern(/^\d+(\.\d{1,2})?$/)
    .required()
    .messages({
      'string.pattern.base': `"price" must be a valid number with up to 2 decimal places`,
      'any.required': `"price" is required`
    }),
    regular_credit: Joi.string()
    .pattern(/^\d+(\.\d{1,2})?$/)
    .required()
    .messages({
      'string.pattern.base': `"price" must be a valid number with up to 2 decimal places`,
      'any.required': `"price" is required`
    }),
    plus_cash: Joi.string()
    .pattern(/^\d+(\.\d{1,2})?$/)
    .required()
    .messages({
      'string.pattern.base': `"price" must be a valid number with up to 2 decimal places`,
      'any.required': `"price" is required`
    }),
    plus_credit: Joi.string()
    .pattern(/^\d+(\.\d{1,2})?$/)
    .required()
    .messages({
      'string.pattern.base': `"price" must be a valid number with up to 2 decimal places`,
      'any.required': `"price" is required`
    }),
    premium_cash: Joi.string()
    .pattern(/^\d+(\.\d{1,2})?$/)
    .required()
    .messages({
      'string.pattern.base': `"price" must be a valid number with up to 2 decimal places`,
      'any.required': `"price" is required`
    }),
    premium_credit: Joi.string()
    .pattern(/^\d+(\.\d{1,2})?$/)
    .required()
    .messages({
      'string.pattern.base': `"price" must be a valid number with up to 2 decimal places`,
      'any.required': `"price" is required`
    }),
    diesel_cash: Joi.string()
    .pattern(/^\d+(\.\d{1,2})?$/)
    .required()
    .messages({
      'string.pattern.base': `"price" must be a valid number with up to 2 decimal places`,
      'any.required': `"price" is required`
    }),
    diesel_credit: Joi.string()
    .pattern(/^\d+(\.\d{1,2})?$/)
    .required()
    .messages({
      'string.pattern.base': `"price" must be a valid number with up to 2 decimal places`,
      'any.required': `"price" is required`
    }),
    ne_cash: Joi.string()
    .pattern(/^\d+(\.\d{1,2})?$/)
    .required()
    .messages({
      'string.pattern.base': `"price" must be a valid number with up to 2 decimal places`,
      'any.required': `"price" is required`
    }),
    ne_credit: Joi.string()
    .pattern(/^\d+(\.\d{1,2})?$/)
    .required()
    .messages({
      'string.pattern.base': `"price" must be a valid number with up to 2 decimal places`,
      'any.required': `"price" is required`
    }),
    created_by: Joi.string().optional().allow(null),
    status: Joi.string().valid("active", "in-active").optional(),
  }),
});