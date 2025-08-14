import { Device } from "../../../models/Device.js";

export const deleteDevice = async (req, res, next) => {
  try {
    const deviceId = req.params.id;

    const getDevice = await Device.findOne({
      _id: deviceId,
      status: "active",
      business_id: req.userDetails.business_id
    });

    if (!getDevice) {
      return res.status(404).json({ message: "Device not found" });
    }

    getDevice.status = "inactive";
    getDevice.updated_by = req.userDetails.userId;
    await getDevice.save();

    return res.ok({
      message: "Device deleted successfully",
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};