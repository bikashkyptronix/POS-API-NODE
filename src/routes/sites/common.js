import { Router } from "express";
import { siteController } from "../../controllers/index.js";
import { productImageUpload, validateApiKey, validateAccessToken, accessTokenIfAny } from "../../middleware/index.js";
import { siteValidation } from "../../validations/index.js";
import multer from "multer"; 

const commonRouter = Router();
const storage = multer.memoryStorage(); // or diskStorage if saving to file system
const upload = multer({ storage });

commonRouter.post(
  "/category-add",
   validateApiKey,
   validateAccessToken, 
   siteValidation.commonValidation.categoryAdd,
   siteController.commonController.categoryAdd,
);

commonRouter.post(
  "/category-list",
   validateApiKey,
   validateAccessToken, 
   siteValidation.commonValidation.categoryList,
   siteController.commonController.categoryList,
);

commonRouter.post(
  "/fuel-update",
   validateApiKey,
   validateAccessToken, 
   siteValidation.commonValidation.fuelUpdate,
   siteController.commonController.fuelUpdate,
);

commonRouter.post(
  "/fuel-list",
   validateApiKey,
   validateAccessToken, 
   siteValidation.commonValidation.fuelList,
   siteController.commonController.fuelList,
);

commonRouter.post(
  "/fuel-list-csv",
  validateApiKey,
  validateAccessToken,
  siteController.commonController.fuelListCSV,
);

commonRouter.post(
  "/device-add",
   validateApiKey,
   validateAccessToken, 
   siteValidation.commonValidation.deviceAdd,
   siteController.commonController.deviceAdd,
);

commonRouter.post(
  "/device-list",
   validateApiKey,
   validateAccessToken, 
   siteValidation.commonValidation.deviceList,
   siteController.commonController.deviceList,
);

commonRouter.get(
  "/device-details/:id",  // ID will come from URL
  validateApiKey,
  validateAccessToken,
  siteController.commonController.getDeviceDetails
);

commonRouter.get(
  "/device-delete/:id",  // ID in URL param
  validateApiKey,
  validateAccessToken,
  siteController.commonController.deleteDevice
);

export { commonRouter };
