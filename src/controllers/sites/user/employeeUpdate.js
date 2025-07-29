import bcrypt from "bcrypt";
import { userService } from "../../../services/index.js";
import { StatusError, envs } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { v4 as uuidv4 } from "uuid";
import { User } from "../../../models/User.js";
import { MAIL_TEMPLATE } from "../../../utils/constants.js";
import mongoose from 'mongoose';

/**
 * employeeUpdate
 * employee details update
 * @param req
 * @param res
 * @param next
 */

export const employeeUpdate = async (req, res, next) => {
  try {
    const employeeId = req.params.id;
    const {
      full_name,
      email,
      role,
      staff_position,
      phone,
      date_of_birth,
      address,
      permissions,
    } = req.body;

    // Check if user exists
    const user = await User.findById(employeeId);
    if (!user) {
      throw StatusError.notFound("Employee not found");
    }

    // Check if another user already uses this email
    const existingEmailUser = await User.findOne({
      email,
      _id: { $ne: employeeId } // Exclude current user from duplicate check
    });
    if (existingEmailUser) {
      throw StatusError.badRequest("This email is already registered");
    }

    // Check for duplicate phone number (excluding current user)
    const existingPhoneUser = await User.findOne({
      phone,
      _id: { $ne: employeeId }
    });
    if (existingPhoneUser) {
      throw StatusError.badRequest("This phone number is already registered");
    }

    // Update fields
    user.full_name = full_name;
    user.email = email;
    user.role = role;
    user.staff_position = staff_position;
    user.phone = phone;
    user.date_of_birth = date_of_birth;
    user.address = address;
    user.permissions = permissions;
    user.updated_by = req.userDetails.userId;

    const updatedUser = await user.save();

    res.ok({
      message: "Employee updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};