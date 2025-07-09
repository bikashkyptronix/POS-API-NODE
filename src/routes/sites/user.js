import { Router } from "express";
import { siteController } from "../../controllers/index.js";
import { profileImageUpload, businessImageUpload, employeeDocUpload, validateApiKey, validateAccessToken, accessTokenIfAny } from "../../middleware/index.js";
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

userRouter.get(
  "/details/:id/:role",  // ID will come from URL
  validateApiKey,
  validateAccessToken,
  siteController.userController.getUserDetails
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

userRouter.post(
  "/employee-document-update",
  validateApiKey,
  validateAccessToken,
  employeeDocUpload.fields([
    { name: "profile_image", maxCount: 1 },
    { name: "aadhar_photo", maxCount: 1 },
  ]),
  siteController.userController.updateEmployeeDoc
);

userRouter.post(
  "/employee-task-assign",
  validateApiKey,
  validateAccessToken,
  siteValidation.userValidation.employeeTaskAssign,
  siteController.userController.employeeTaskAssign,
);

userRouter.get(
  "/task-list/:id",
  validateApiKey,
  validateAccessToken,
  siteController.userController.getEmployeeTaskList
);

export { userRouter };
