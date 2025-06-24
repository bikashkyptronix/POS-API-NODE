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

export { commonRouter };
