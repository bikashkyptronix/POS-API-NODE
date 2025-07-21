import { Router } from "express";
import { siteController } from "../../controllers/index.js";
import { validateApiKey, validateAccessToken, accessTokenIfAny } from "../../middleware/index.js";
import { siteValidation } from "../../validations/index.js";
import multer from "multer"; 

const loyaltyRouter = Router();
const storage = multer.memoryStorage(); // or diskStorage if saving to file system
const upload = multer({ storage });

loyaltyRouter.post(
  "/deal-add",
   validateApiKey,
   validateAccessToken,
   siteValidation.loyaltyValidation.dealsAdd,
   siteController.loyaltyController.dealsAdd,
);

loyaltyRouter.post(
  "/deal-list",
   validateApiKey,
   validateAccessToken,
   siteValidation.loyaltyValidation.dealsList,
   siteController.loyaltyController.dealsList,
);

export { loyaltyRouter };
