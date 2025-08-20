import { Router } from "express";
import { siteController } from "../../controllers/index.js";
import { profileImageUpload, businessImageUpload, employeeDocUpload, validateApiKey, validateAccessToken, accessTokenIfAny } from "../../middleware/index.js";
import { siteValidation } from "../../validations/index.js";

const supplierRouter = Router();

supplierRouter.post(
  "/add",
  validateApiKey,
  validateAccessToken,
  siteValidation.supplierValidation.supplierAdd,
  siteController.supplierController.supplierAdd,
);

supplierRouter.post(
  "/list",
  validateApiKey,
  validateAccessToken,
  siteValidation.supplierValidation.supplierList,
  siteController.supplierController.supplierList,
);

supplierRouter.post(
  "/update/:id", // Employee ID in URL
  validateApiKey,
  validateAccessToken,
  siteValidation.supplierValidation.supplierUpdate,
  siteController.supplierController.supplierUpdate
);

supplierRouter.get(
  "/details/:id/:role",  // ID will come from URL
  validateApiKey,
  validateAccessToken,
  siteController.supplierController.getSupplierDetails
);

supplierRouter.get(
  "/delete/:id",  // ID in URL param
  validateApiKey,
  validateAccessToken,
  siteController.supplierController.deleteSupplier
);

supplierRouter.post(
  "/bulk-delete",
  validateApiKey,
  validateAccessToken,
  siteController.supplierController.bulkDeleteSupplier,
);

export { supplierRouter };