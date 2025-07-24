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

loyaltyRouter.get(
  "/deal-details/:id",  // ID will come from URL
  validateApiKey,
  validateAccessToken,
  siteController.loyaltyController.getDealDetails
);

loyaltyRouter.post(
  "/deal-update/:id", // Product ID in URL
  validateApiKey,
  validateAccessToken,
  siteValidation.loyaltyValidation.dealsUpdate,
  siteController.loyaltyController.dealsUpdate
);

loyaltyRouter.get(
  "/deal-delete/:id",  // ID in URL param 
  validateApiKey,
  validateAccessToken,
  siteController.loyaltyController.deleteDeal
);

export { loyaltyRouter };
