import { Router } from "express";
import { siteController } from "../../controllers/index.js";
import { profileImageUpload, validateApiKey, validateAccessToken, accessTokenIfAny } from "../../middleware/index.js";
import { siteValidation } from "../../validations/index.js";

const userRouter = Router();

userRouter.post(
  "/test",
   validateApiKey,
  // validateAccessToken,
  siteValidation.userValidation.testDatacheck,
  siteController.userController.test,
);

userRouter.post(
  "/employee-add",
  validateApiKey,
  validateAccessToken,
  siteValidation.userValidation.employeeAdd,
  siteController.userController.employeeAdd,
);

userRouter.post(
  "/employee-list",
  validateApiKey,
  validateAccessToken,
  siteValidation.userValidation.employeeList,
  siteController.userController.employeeList,
);

userRouter.post(
  "/update-profile-image",
  validateApiKey,
  validateAccessToken,
  profileImageUpload.single("profile_image"), // multer middleware
  siteController.userController.updateProfileImage
);

export { userRouter };
