import { userService } from "../services/index.js";
import { envs, StatusError } from "../config/index.js";

/**
 * This function is used for validating authorization header
 * @param req
 * @param res
 * @param next
 */
export const validateAccessToken = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) throw StatusError.forbidden("");
    
    const decodedData = userService.verifyToken(token, envs.jwt.accessToken.secret);
    if (!decodedData) throw StatusError.unauthorized("");

    const userDetails = await userService.getByEmail(decodedData.email);
    if (!userDetails) throw StatusError.unauthorized("");

    // const userRole = await userRoleService.getUserRole(userDetails.id);
    // if (!userRole) throw StatusError.unauthorized("");

    req["userDetails"] = {
      userId: userDetails._id,
      name: userDetails.full_name,
      email: userDetails.email,
      business_id: userDetails.business_id ? userDetails.business_id : userDetails.owner_business_id,
      //user_type: userRole.role_name,
      //user_role_id: userRole.role_id,
    };
    next();
  } catch (error) {
    next(error);
  }
};
