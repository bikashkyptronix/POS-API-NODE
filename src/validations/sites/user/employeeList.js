import { celebrate, Joi } from "celebrate";
export const employeeList = celebrate({
  body: Joi.object({
    page: Joi.number().optional(),
    limit: Joi.number().optional(),
  }),
});
