import bcrypt from "bcrypt";
import { userService } from "../../../services/index.js";
import { StatusError } from "../../../config/index.js";
import { User } from "../../../models/User.js";
import { customDateTimeHelper } from "../../../helpers/index.js";

/**
 * User login
 * @param req
 * @param res
 * @param next
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Get user by email using Mongoose
    const userDetails = await User.findOne({ email });
    if (!userDetails) throw StatusError.badRequest({ email: "email does not exist" });

    // 2. Compare password
    const isSame = await bcrypt.compare(password, userDetails.password_hash);
    if (!isSame) throw StatusError.badRequest({ password: "Password does not match" });

    // 3. Generate JWT tokens
    const result = await userService.generateTokens(userDetails.email);

    // 4. Update last login
    const updateDate = await customDateTimeHelper.getCurrentDateTime();
    userDetails.last_login = updateDate;
    userDetails.updated_at = updateDate;
    await userDetails.save();

    // 5. Respond
    res.ok({
      user_id: userDetails._id,
      email: userDetails.email,
      user_type: userDetails.role,
      profile_image: userDetails.avatar || null,
      token: result.access_token,
      business_id: userDetails.business_id ? userDetails.business_id : userDetails.owner_business_id,
      token_expiry: result.access_token_expiry,
    });
  } catch (error) {
    next(error);
  }
};
