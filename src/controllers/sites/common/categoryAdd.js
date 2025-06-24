import bcrypt from "bcrypt";
import { userService } from "../../../services/index.js";
import { StatusError, envs } from "../../../config/index.js";
import { generalHelper } from "../../../helpers/index.js";
import { v4 as uuidv4 } from "uuid";
import { Category } from "../../../models/Category.js";
import { MAIL_TEMPLATE } from "../../../utils/constants.js";

/**
 * categoryAdd
 * User can categoryAdd with details
 * @param req
 * @param res
 * @param next
 */
export const categoryAdd = async (req, res, next) => {

  try {
      const reqBody = req.body;
      const businessId = req.userDetails.business_id;
      const userId = req.userDetails.userId;
      const {
        category_name,
      } = req.body;

      const category_slug = await generalHelper.slugCreation(category_name);

      // Check if category with same slug and business_id already exists
      const categoryExist = await Category.findOne({
        category_slug: category_slug,
        business_id: businessId
      });

      if (categoryExist) {
        throw StatusError.badRequest("This category is already present for this business");
      }

      const newCategory = new Category({
      category_name,
      category_slug: category_slug,
      business_id: req.userDetails.business_id || null,
      status: "active",
      created_by: req.userDetails.userId,
      updated_by: req.userDetails.userId,
      });

      const savedCategory = await newCategory.save();

      const insertedId = savedCategory._id;
      if(insertedId)
      {
          res.ok({
          message: "Category created successfully",
          category: newCategory
        });
      } else {
       throw StatusError.badRequest(res.__("serverError"));
      }
     
    } catch (error) {
      next(error);
    }
};