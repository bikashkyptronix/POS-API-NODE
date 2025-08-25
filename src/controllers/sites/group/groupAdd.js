import bcrypt from "bcrypt";
import { userService } from "../../../services/index.js";
import { StatusError, envs } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { v4 as uuidv4 } from "uuid";
import { Group } from "../../../models/Group.js";
import { MAIL_TEMPLATE } from "../../../utils/constants.js";
import mongoose from 'mongoose';

/**
 * groupAdd
 * group details add
 * @param req
 * @param res
 * @param next
 */
export const groupAdd = async (req, res, next) => {

  try {
        const { group_name, status, productIds } = req.body;
    
        // check email
        // const userDetails = await User.findOne({ email: email }).lean();
        //if (userDetails) throw StatusError.badRequest("This email is already registered");

        // Hash password (if using plain password)
        const bcrypt = await import("bcrypt");
        const saltRounds = 10;
        //const password_hash = await bcrypt.hash(password, saltRounds);
  
        // Create and save Group
        const newGroup = new Group({
        group_name,
        status,
        products: productIds || [], // save productIds in products field
        business_id: req.userDetails.business_id,
        created_by: req.userDetails.userId,
        updated_by: req.userDetails.userId,
        });

        const savedGroup = await newGroup.save();
        const insertedId = savedGroup._id;
        if(insertedId)
        {
            res.ok({
            message: "Group created successfully",
            group: newGroup
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