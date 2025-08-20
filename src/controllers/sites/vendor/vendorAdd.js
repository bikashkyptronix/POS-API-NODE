import bcrypt from "bcrypt";
import { userService } from "../../../services/index.js";
import { StatusError, envs } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { v4 as uuidv4 } from "uuid";
import { User } from "../../../models/User.js";
import { MAIL_TEMPLATE } from "../../../utils/constants.js";
import mongoose from 'mongoose';

/**
 * vendorAdd
 * employee details add
 * @param req
 * @param res
 * @param next
 */
export const vendorAdd = async (req, res, next) => {

  try {
      const reqBody = req.body;
      const {
        full_name,
        email,
        //password, 
        role,
        phone,
        address,
        status,
        permissions,
      } = req.body;
  
      const userDetails = await User.findOne({ email: email }).lean();
      if (userDetails) throw StatusError.badRequest("This email is already registered");

      const existingPhoneUser = await User.findOne({ phone });
      if (existingPhoneUser) {
        throw StatusError.badRequest("This phone number is already registered");
      }

      // Hash password (if using plain password)
      const bcrypt = await import("bcrypt");
      const saltRounds = 10;
      //const password_hash = await bcrypt.hash(password, saltRounds);
  
      // Create and save user
      const newUser = new User({
        full_name,
        email,
        //password_hash,
        role,
        owner_business_id: req.userDetails.business_id,
        phone,
        address,
        status,
        permissions,
        created_by: req.userDetails.userId,
      });
  
      const savedUser = await newUser.save();
      const insertedId = savedUser._id;
      if(insertedId)
      {
          res.ok({
          message: "Vendor created successfully",
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