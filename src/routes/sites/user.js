import { Router } from "express";
import { siteController } from "../../controllers/index.js";
import { profileImageUpload, businessImageUpload, validateApiKey, validateAccessToken, accessTokenIfAny } from "../../middleware/index.js";
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

userRouter.post(
  "/update-business-logo",
  validateApiKey,
  validateAccessToken,
  businessImageUpload.single("business_logo"), // multer middleware
  siteController.userController.updateBusinessLogo
);

export { userRouter };
