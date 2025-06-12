//import model from "../../../models/index.js";
import { StatusError } from "../../../config/index.js";
import { customDateTimeHelper } from "../../../helpers/index.js";
//import { logService, schedulerJobService } from "../../../services/index.js";

/**
 * updateView
 * @param req
 * @param res
 */
export const updateView = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const id = reqBody.video_id ? reqBody.video_id : "";
    const type = "video";
    const userSessionId = reqBody.user_session_id ? reqBody.user_session_id : "";
    const userId = req.userDetails && req.userDetails.userId ? req.userDetails.userId : null;
    const userName = req.userDetails && req.userDetails.name ? req.userDetails.name : "";
    const email = req.userDetails && req.userDetails.email ? req.userDetails.email : "";
    let itemName = "";
    
    res.ok({
      message: res.__("success"),
    });
  } catch (error) {
    next(error);
  }
};
