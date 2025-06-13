import bcrypt from "bcrypt";
import { StatusError } from "../../../config/index.js";
import { envs } from "../../../config/index.js";
import { User } from "../../../models/User.js";
import mongoose from 'mongoose';

/* *
 * changePassword
 * @param req
 * @param res
 * @param next
 */

export const changePassword = async (req, res, next) => {
  try {
    const userId = req.body.user_id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw StatusError.badRequest("Invalid user ID format");
    }
    
    const userDetails = await User.findOne({ _id: userId, status: "active" });
    if (!userDetails) throw StatusError.badRequest("invalidId");
    const hashedPassword = await bcrypt.hash(req.body.password, envs.passwordSalt);

    // Update and save
    userDetails.password_hash = hashedPassword;
    await userDetails.save();

    res.ok({ message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
