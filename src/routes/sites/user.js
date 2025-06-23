import { Router } from "express";
import { siteController } from "../../controllers/index.js";
import { validateApiKey, validateAccessToken, accessTokenIfAny } from "../../middleware/index.js";
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

export { userRouter };
