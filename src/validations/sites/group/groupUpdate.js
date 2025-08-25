import { celebrate, Joi, Segments } from "celebrate";

export const groupUpdate = celebrate({
  [Segments.BODY]: Joi.object({
    group_name: Joi.string().trim().required(),
    productIds: Joi.array()
      .items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)) // must be valid MongoDB ObjectId
      .optional()
      .default([]),
    status: Joi.string()
        .valid("active", "inactive")
        .optional()
  }).prefs({ convert: true }) // convert types from strings (for form-data)
});