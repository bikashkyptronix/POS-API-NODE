import { User } from "../../../models/User.js";
import { StatusError } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
//import { logService, schedulerJobService } from "../../../services/index.js";

/**
 * test
 * @param req
 * @param res
 */
export const test = async (req, res, next) => {
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

    await newUser.save();

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
