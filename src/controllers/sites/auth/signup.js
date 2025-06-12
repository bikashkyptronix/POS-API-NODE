import bcrypt from "bcrypt";
//import { userService, userRoleService, emailService } from "../../../services/index.js";
import { StatusError, envs } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { v4 as uuidv4 } from "uuid";
import { User } from "../../../models/User.js";
import { MAIL_TEMPLATE } from "../../../utils/constants.js";

/**
 * signup
 * User can signup with details
 * @param req
 * @param res
 * @param next
 */
export const signup = async (req, res, next) => {

  try {
      const {
        first_name,
        last_name,
        email,
        password, // plain password from body
        role,
        business_id,
        phone,
        address,
        status,
        permissions,
      } = req.body;
  
      // Hash password (if using plain password)
      const bcrypt = await import("bcrypt");
      const saltRounds = 10;
      const password_hash = await bcrypt.hash(password, saltRounds);
  
      // Create and save user
      const newUser = new User({
        first_name,
        last_name,
        email,
        password_hash,
        role,
        business_id,
        phone,
        address,
        status,
        permissions,
      });
  
      const savedUser = await newUser.save();
      const insertedId = savedUser._id;
      if(insertedId)
      {
          res.ok({
          message: "User created successfully",
          user: newUser
        });
      } else {
        throw StatusError.badRequest("serverError");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
};
