import { Router } from "express";
import { siteController } from "../../controllers/index.js";
import { validateApiKey, validateAccessToken, accessTokenIfAny } from "../../middleware/index.js";
import { siteValidation } from "../../validations/index.js";
import multer from "multer"; 

const customerRouter = Router();
const storage = multer.memoryStorage(); // or diskStorage if saving to file system
const upload = multer({ storage });

customerRouter.post(
  "/add",
   validateApiKey,
   validateAccessToken,
   siteValidation.customerValidation.customerAdd,
   siteController.customerController.customerAdd,
);

customerRouter.post(
  "/list",
   validateApiKey,
   validateAccessToken,
   siteValidation.customerValidation.customerList,
   siteController.customerController.customerList,
);

customerRouter.get(
  "/delete/:id",  // ID in URL param
  validateApiKey,
  validateAccessToken,
  siteController.customerController.deleteCustomer
);

customerRouter.post(
  "/bulk-delete",
  validateApiKey,
  validateAccessToken,
  siteController.customerController.bulkDeleteCustomer
);

export { customerRouter };
