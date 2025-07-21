import { Device } from "../../../models/Device.js";

export const deleteDevice = async (req, res, next) => {
  try {
    const deviceId = req.params.id;

    const findDevice = await Device.findOne({
      _id: deviceId,
      business_id: req.userDetails.business_id
    });

    if (!findDevice) {
      return res.status(404).json({ message: "Device not found" });
    }

    findDevice.status = "inactive";
    findDevice.updated_by = req.userDetails.userId;
    await findDevice.save();

    return res.ok({
      message: "Device deleted successfully",
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};