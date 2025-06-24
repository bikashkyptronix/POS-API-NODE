import { celebrate, Joi, Segments } from "celebrate";

export const categoryAdd = celebrate({
  [Segments.BODY]: Joi.object({
    category_name: Joi.string().trim().required()
  }).prefs({ convert: true }) // Enables type coercion from strings (e.g., from form-data)
});
