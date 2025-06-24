import { celebrate, Joi } from "celebrate";
export const categoryList = celebrate({
  body: Joi.object({
    page: Joi.number().optional(),
    limit: Joi.number().optional(),
  }),
});
