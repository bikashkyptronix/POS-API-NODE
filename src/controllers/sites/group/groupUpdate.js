import bcrypt from "bcrypt";
import { userService } from "../../../services/index.js";
import { StatusError, envs } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { v4 as uuidv4 } from "uuid"; 
import { Group } from "../../../models/Group.js";
import { Category } from "../../../models/Category.js";
import { MAIL_TEMPLATE } from "../../../utils/constants.js";
import mongoose from 'mongoose';

/**
 * supplierUpdate
 * supplier details update
 * @param req
 * @param res
 * @param next
 */

export const groupUpdate = async (req, res, next) => {
  try {
    const groupId = req.params.id;
    const {
      group_name,
      status,
      productIds
    } = req.body;

    // Check if group exists
    const group = await Group.findOne({
      _id: groupId,
      status: "active"
    });

    if (!group) {
      throw StatusError.notFound("Group not found!");
    }

    // Update fields
    group.group_name = group_name;
    group.status = status;
    group.products = productIds || [];
    group.business_id = req.userDetails.business_id;
    group.updated_by = req.userDetails.userId;

    const updatedGroup = await group.save();

    res.ok({
      message: "Group updated successfully",
      group: updatedGroup,
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};
