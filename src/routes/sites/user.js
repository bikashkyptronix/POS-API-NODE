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
  employeeDocUpload.single("profile_image"), 
  siteValidation.userValidation.employeeAdd,
  siteController.userController.employeeAdd,
);

userRouter.post(
  "/employee-update/:id", // Employee ID in URL
  validateApiKey,
  validateAccessToken,
  employeeDocUpload.single("profile_image"), 
  siteValidation.userValidation.employeeUpdate,
  siteController.userController.employeeUpdate
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

userRouter.get(
  "/employee-delete/:id",  // ID in URL param
  validateApiKey,
  validateAccessToken,
  siteController.userController.deleteEmployee
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
  "/employee-task-details/:id",  // ID will come from URL
  validateApiKey,
  validateAccessToken,
  siteController.userController.employeeTaskDetails
);

userRouter.post(
  "/employee-task-update/:id", // Employee ID in URL
  validateApiKey,
  validateAccessToken,
  siteValidation.userValidation.employeeTaskUpdate,
  siteController.userController.employeeTaskUpdate
);

userRouter.post(
  "/task-list",
  validateApiKey,
  validateAccessToken,
  siteController.userController.getEmployeeTaskList
);

userRouter.get(
  "/task-delete/:id",  // ID in URL param 
  validateApiKey,
  validateAccessToken,
  siteController.userController.deleteEmployeeTask
);

userRouter.post(
  "/comment-on-task",
  validateApiKey,
  validateAccessToken,
  siteController.userController.taskComment
);

userRouter.post(
  "/comment-list",
  validateApiKey,
  validateAccessToken,
  siteController.userController.getTaskCommentList
);

export { userRouter };
