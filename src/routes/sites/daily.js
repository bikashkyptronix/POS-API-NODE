import { Router } from "express";
import { siteController } from "../../controllers/index.js";
import { profileImageUpload, businessImageUpload, purchaseInvoiceUpload, validateApiKey, validateAccessToken, accessTokenIfAny } from "../../middleware/index.js";
import { siteValidation } from "../../validations/index.js";

const dailyRouter = Router();

dailyRouter.post(
  "/purchase-add",
  validateApiKey,
  validateAccessToken,
  purchaseInvoiceUpload.single("purchase_invoice_image"), 
  siteValidation.dailyValidation.purchaseAdd,
  siteController.dailyController.purchaseAdd,
);

dailyRouter.post(
  "/purchase-update/:id", // Purchase ID in URL
  validateApiKey,
  validateAccessToken,
  purchaseInvoiceUpload.single("purchase_invoice_image"), 
  siteValidation.dailyValidation.purchaseUpdate,
  siteController.dailyController.purchaseUpdate
);

dailyRouter.get(
  "/purchase-details/:id",  // ID will come from URL
  validateApiKey,
  validateAccessToken,
  siteController.dailyController.getPurchaseDetail
);

dailyRouter.post(
  "/purchase-list",
  validateApiKey,
  validateAccessToken,
  siteValidation.dailyValidation.purchaseList,
  siteController.dailyController.purchaseList,
);

dailyRouter.get(
  "/employee-delete/:id",  // ID in URL param
  validateApiKey,
  validateAccessToken,
  siteController.userController.deleteEmployee
);

dailyRouter.post(
  "/bulk-employee-delete",
  validateApiKey,
  validateAccessToken,
  siteController.userController.bulkDeleteEmployee,
);

export { dailyRouter };