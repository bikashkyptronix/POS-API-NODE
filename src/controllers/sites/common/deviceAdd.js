import bcrypt from "bcrypt";
import { userService } from "../../../services/index.js";
import { StatusError, envs } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { v4 as uuidv4 } from "uuid";
import { Device } from "../../../models/Device.js";
import { MAIL_TEMPLATE } from "../../../utils/constants.js";

/**
 * deviceAdd
 * User can deviceAdd with details
 * @param req
 * @param res
 * @param next
 */
export const deviceAdd = async (req, res, next) => {
  try {
       const reqBody = req.body;
       const userId = req.userDetails.userId;
      const {
        device_name,
        location,
        device_type,
        status,
      } = req.body;

    const newDevice = new Device({
    device_name,
    location,
    device_type,
    business_id: req.userDetails.business_id || null,
    status,
    created_by: req.userDetails.userId,
    updated_by: req.userDetails.userId,
    });

    const savedDevice = await newDevice.save();

      const insertedId = savedDevice._id;
      if(insertedId)
      {
        res.ok({
          message: "Device created successfully",
          deviceDetails: newDevice
        });
      } else {
       throw StatusError.badRequest(res.__("serverError"));
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
};