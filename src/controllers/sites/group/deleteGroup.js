import { Group } from "../../../models/Group.js";

export const deleteGroup = async (req, res, next) => {
  try {
    const groupId = req.params.id;

    const groupDetails = await Group.findOne({
      _id: groupId,
      status: "active",
      business_id: req.userDetails.business_id
    });

    if (!groupDetails) {
      return res.status(404).json({ message: "Group not found" });
    }

    groupDetails.status = "inactive";
    groupDetails.updated_by = req.userDetails.userId;
    await groupDetails.save();

    return res.ok({
      message: "Group deleted successfully",
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};