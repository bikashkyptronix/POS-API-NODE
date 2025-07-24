import { celebrate, Joi } from "celebrate";
import { validationHelper } from "../../../helpers/index.js";

export const employeeTaskAssign = celebrate({
  body: Joi.object({
    employee_id: Joi.string().trim().required(),
    task_title: Joi.string().trim().required(),
    task_details: Joi.string().required(), // Plain password from request body
    task_deadline: Joi.date().optional().allow(null, ''),
    created_by: Joi.string().optional().allow(null),
    task_status: Joi.string().valid("pending", "on-going", "defer", "completed").optional(),
    //status: Joi.string().valid("active", "in-active").optional(),
  }),
});