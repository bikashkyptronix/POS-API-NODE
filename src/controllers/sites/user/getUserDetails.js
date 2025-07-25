import { userService } from "../../../services/index.js";
import { StatusError, envs } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { v4 as uuidv4 } from "uuid";
import { User } from "../../../models/User.js";
import { MAIL_TEMPLATE } from "../../../utils/constants.js";

export const getUserDetails = async (req, res, next) => {
  try {
    const { id, role } = req.params;

    const checkUser = await User.findOne({
      _id: id,
      status: "active",
      role: role
    }).lean();

    if (!checkUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const created_by = checkUser.created_by ? checkUser.created_by : "";
    let createdUserName = '';
    if(created_by)
    {
      const createdUserDetails = await User.findOne({
        _id: id
      }).lean();
      createdUserName = createdUserDetails.full_name;
    }

    const result = {
      id: checkUser._id,
      name: checkUser.full_name,
      email: checkUser.email,
      phone: checkUser.phone,
      staff_position: checkUser.staff_position,
      profile_image: checkUser.profile_image,
      staff_aadhar: checkUser.staff_aadhar,
      createdBy: createdUserName,
      status: checkUser.status,
      created_at: checkUser.createdAt,
      updated_at: checkUser.updatedAt
    };

    return res.ok({
      message: "User details fetched successfully",
      userDetails: result
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};