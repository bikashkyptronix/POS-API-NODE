import { userService } from "../../../services/index.js";
import { StatusError, envs } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { v4 as uuidv4 } from "uuid";
import { Device } from "../../../models/Device.js";
import { MAIL_TEMPLATE } from "../../../utils/constants.js";

export const getDeviceDetails = async (req, res, next) => {
  try {
    const deviceId = req.params.id;

    const getDevice = await Device.findOne({
      _id: deviceId,
      status: "active",
      business_id: req.userDetails.business_id
    }).lean();

    if (!getDevice) {
      return res.status(404).json({ message: "Device not found" });
    }

    const result = {
      id: getDevice._id,
      product_name: getDevice.device_name,
      location: getDevice.location,
      device_type: getDevice.device_type,
      status: getDevice.status,
      created_at: getDevice.createdAt,
      updated_at: getDevice.updatedAt
    };

    return res.ok({
      message: "Device details fetched successfully",
      product: result
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};