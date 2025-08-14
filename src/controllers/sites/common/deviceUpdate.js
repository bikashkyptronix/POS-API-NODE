import bcrypt from "bcrypt";
import { userService } from "../../../services/index.js";
import { StatusError, envs } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { v4 as uuidv4 } from "uuid";
import { Device } from "../../../models/Device.js";
import { MAIL_TEMPLATE } from "../../../utils/constants.js";
import mongoose from "mongoose";

/**
 * deviceUpdate
 * User can deviceUpdate with details
 * @param req
 * @param res
 * @param next
 */
export const deviceUpdate = async (req, res, next) => {
  try {

    const deviceId = req.params.id;
    const {
      device_name,
      location,
      device_type,
      status
    } = req.body;
      
    const existingDevice = await Device.findOne({
      _id: deviceId,
      business_id: req.userDetails.business_id
    });

    if (!existingDevice) {
      return res.status(404).json({ message: "Device not found" });
    }

    // Update fields
    existingDevice.device_name = device_name;
    existingDevice.location = location;
    existingDevice.device_type = device_type;
    existingDevice.status = status;
    existingDevice.updated_by = req.userDetails.userId;

    await existingDevice.save();

    return res.ok({
      message: "Device updated successfully",
      deviceData: existingDevice
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};