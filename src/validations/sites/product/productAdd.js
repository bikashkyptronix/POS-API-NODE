import { celebrate, Joi, Segments } from "celebrate";

export const productAdd = celebrate({
  [Segments.BODY]: Joi.object({
    stock_code: Joi.string().trim().required(),
    qty_on_hand: Joi.number()
      .min(0)
      .required()
      .messages({
        'number.base': 'qty_on_hand must be a number'
      }),
    qty_cases: Joi.number()
      .min(0)
      .required()
      .messages({
        'number.base': 'qty_cases must be a number'
    }),
    product_quantity: Joi.number()
      .integer()
      .min(0)
      .optional()
      .allow(null, "")
      .messages({
        'number.base': 'product_quantity must be a number'
    }),
    product_name: Joi.string().trim().required(),
    product_size: Joi.string().trim().required(),
    selected_vendor_id: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .optional()
      .allow(null, ""),
    selected_category_id: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .optional()
      .allow(null, ""),
    selected_supplier_id: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .optional()
      .allow(null, ""),
    product_sku: Joi.string().trim().optional().allow(null, ""),
    // for_sale: Joi.string()
    //   .valid("yes", "no")
    //   .required(),
    product_price: Joi.number()
      .min(0)
      .precision(2) // allows up to 2 decimal places
      .required()
      .messages({
        'number.base': 'product_price must be a number',
        'number.precision': 'product_price must have at most 2 decimal places'
    }),
    product_avg_price: Joi.number()
      .min(0)
      .precision(2) // allows up to 2 decimal places
      .required()
      .messages({
        'number.base': 'product_avg_price must be a number',
        'number.precision': 'product_avg_price must have at most 2 decimal places'
    }),
    product_latest_cost: Joi.number()
      .min(0)
      .precision(2) // allows up to 2 decimal places
      .required()
      .messages({
        'number.base': 'product_latest_cost must be a number',
        'number.precision': 'product_latest_cost must have at most 2 decimal places'
    }),
    product_margin: Joi.number()
      .min(0)
      .optional()
      .allow(null, "")
      .messages({
        'number.base': 'product_margin must be a number'
    }),
    product_markup: Joi.number()
      .min(0)
      .optional()
      .allow(null, "")
      .messages({
        'number.base': 'product_markup must be a number'
    }),
    tax_percentage: Joi.number()
      .min(0)
      .max(100)
      .optional()
      .allow(null, "")
      .messages({
        'number.base': 'tax_percentage must be a number between 0 and 100'
      }),
    unit_per_case: Joi.string().trim().required(), 
    case_cost_total: Joi.number()
      .min(0)
      .precision(2) // allows up to 2 decimal places
      .required()
      .messages({
        'number.base': 'case_cost_total must be a number',
        'number.precision': 'case_cost_total must have at most 2 decimal places'
    }), 
    reorder_value: Joi.number()
      .min(0)
      .optional()
      .allow(null, "")
      .messages({
        'number.base': 'reorder_value must be a number'
    }),
    reorder_point: Joi.number()
      .integer()
      .min(0)
      .optional()
      .allow(null, "")
      .messages({
        'number.base': 'reorder_point must be a number'
    }),
    product_rank: Joi.number()
      .integer()
      .min(0)
      .optional()
      .allow(null, "")
      .messages({
        'number.base': 'rank must be a number'
    }),
    business_id: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .optional()
      .allow(null, ""),
    status: Joi.string()
      .valid("active", "inactive")
      .optional(),
    // Boolean flags
    don_not_auto_update: Joi.boolean().optional(),
    add_to_shortcut_key: Joi.boolean().optional(),
    do_not_manual_discount: Joi.boolean().optional(),
    do_not_show_to_webstore: Joi.boolean().optional(),
    ebt_eligible: Joi.boolean().optional(),
    do_not_track_inventory: Joi.boolean().optional(),
    close_out_item: Joi.boolean().optional(),
    exclude_from_promotions_discount: Joi.boolean().optional(),
    hide_inventory: Joi.boolean().optional(),

    // Optional fields
    shortcut_key_color: Joi.string().optional().allow(null, ""),
    product_default_quantity: Joi.number().min(0).optional().allow(null, ""),
    product_min_price: Joi.number().min(0).optional().allow(null, ""),
    remind_date: Joi.string().optional().allow(null, ""),
    notes: Joi.string().optional().allow(null, ""),
    tags: Joi.string().optional().allow(null, ""),
    points_multiplier: Joi.string().optional().allow(null, ""),
    points_required: Joi.number().min(0).optional().allow(null, ""),
    item_type: Joi.string().optional().allow(null, ""),
  }).prefs({ convert: true }) // Enables type coercion from strings (e.g., from form-data)
});
