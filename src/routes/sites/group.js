import { Router } from "express";
import { siteController } from "../../controllers/index.js";
import { productImageUpload, validateApiKey, validateAccessToken, accessTokenIfAny } from "../../middleware/index.js";
import { siteValidation } from "../../validations/index.js";
import multer from "multer"; 

const groupRouter = Router();
// ✅ Configure multer (you can move this to a separate `upload.js` if needed)
const storage = multer.memoryStorage(); // or diskStorage if saving to file system
const upload = multer({ storage });

groupRouter.post(
  "/add",
  validateApiKey,
  validateAccessToken,
  siteValidation.groupValidation.groupAdd,
  siteController.groupController.groupAdd
);

groupRouter.post(
  "/update/:id",
  validateApiKey,
  validateAccessToken,
  siteValidation.groupValidation.groupUpdate,
  siteController.groupController.groupUpdate
);

groupRouter.get(
  "/details/:id",  // ID will come from URL
  validateApiKey,
  validateAccessToken,
  siteController.groupController.getGroupDetail
);

groupRouter.get(
  "/delete/:id",  // ID in URL param
  validateApiKey,
  validateAccessToken,
  siteController.groupController.deleteGroup
);


groupRouter.post(
  "/list",
   validateApiKey,
   validateAccessToken,
   siteValidation.groupValidation.groupList,
   siteController.groupController.groupList,
);

export { groupRouter };