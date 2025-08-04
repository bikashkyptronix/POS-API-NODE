import { celebrate, Joi } from "celebrate";
import { validationHelper } from "../../../helpers/index.js";

export const employeeTaskUpdate = celebrate({
  body: Joi.object({
    employee_id: Joi.string().trim().required(),
    task_title: Joi.string().trim().required(),
    task_details: Joi.string().required(), // Plain password from request body
    task_deadline: Joi.date().optional().allow(null, ''),
    task_status: Joi.string().valid("pending", "on-going", "defer", "completed").optional(),
  }),
});