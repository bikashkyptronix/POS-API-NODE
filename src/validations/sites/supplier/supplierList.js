import { celebrate, Joi } from "celebrate";
export const supplierList = celebrate({
  body: Joi.object({
    page: Joi.number().optional(),
    limit: Joi.number().optional(),
    search_text: Joi.optional().empty(["", null]),
  }),
});