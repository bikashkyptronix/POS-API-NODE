import bcrypt from "bcrypt";
import { userService } from "../../../services/index.js";
import { StatusError, envs } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { v4 as uuidv4 } from "uuid";
import { User } from "../../../models/User.js";
import { Category } from "../../../models/Category.js";
import { MAIL_TEMPLATE } from "../../../utils/constants.js";
import mongoose from 'mongoose';

/**
 * supplierAdd
 * employee details add
 * @param req
 * @param res
 * @param next
 */
export const supplierAdd = async (req, res, next) => {

  try {
      const reqBody = req.body;
      const {
        full_name,
        email,
        password,
        role,
        phone,
        supplier_choose_cat_id,
        address,
        status,
      } = req.body;
  
      // Check category exist or not
      const checkCategory = await Category.findOne({
          _id: supplier_choose_cat_id,
          status: "active"
      });
  
      if (!checkCategory) {
          throw StatusError.notFound("Selecetd category not found!");
      }

      // check email
      const userDetails = await User.findOne({ email: email }).lean();
      if (userDetails) throw StatusError.badRequest("This email is already registered");

      // check phone number
      const existingPhoneUser = await User.findOne({ phone });
      if (existingPhoneUser) {
        throw StatusError.badRequest("This phone number is already registered");
      }

      // Hash password (if using plain password)
      const bcrypt = await import("bcrypt");
      const saltRounds = 10;
      const password_hash = await bcrypt.hash(password, saltRounds);
  
      // Create and save user
      const newUser = new User({
        full_name,
        email,
        password_hash,
        role,
        owner_business_id: req.userDetails.business_id,
        phone,
        supplier_choose_cat_id,
        address,
        status,
        created_by: req.userDetails.userId,
      });
  
      const savedUser = await newUser.save();
      const insertedId = savedUser._id;
      if(insertedId)
      {
          res.ok({
          message: "Supplier created successfully",
          user: newUser
        });
      } else {
        console.log(error);
       throw StatusError.badRequest("serverError");
      }
     
    } catch (error) {
      console.log(error);
      next(error);
    }
};