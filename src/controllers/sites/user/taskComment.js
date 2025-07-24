import bcrypt from "bcrypt";
import { userService } from "../../../services/index.js";
import { StatusError, envs } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
import { v4 as uuidv4 } from "uuid";
import { TaskComment } from "../../../models/TaskComment.js";
import { MAIL_TEMPLATE } from "../../../utils/constants.js";

/**
 * taskComment
 * User can taskComment with details
 * @param req
 * @param res
 * @param next
 */
export const taskComment = async (req, res, next) => {

  try {
    const reqBody = req.body;
    const userId = req.userDetails.userId;
    const {
    task_id,
    comment,
    } = req.body;

    const newTaskComment = new TaskComment({
    task_id,
    comment,
    created_by: userId,
    });

    const savedComment = await newTaskComment.save();

      const insertedId = savedComment._id;
      if(insertedId)
      {
        res.ok({
          message: "Comment submitted successfully",
          product: newTaskComment
        });
      } else {
       throw StatusError.badRequest(res.__("serverError"));
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
};