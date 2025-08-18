import { Router } from "express";
import { siteController } from "../../controllers/index.js";
import { profileImageUpload, businessImageUpload, employeeDocUpload, validateApiKey, validateAccessToken, accessTokenIfAny } from "../../middleware/index.js";
import { siteValidation } from "../../validations/index.js";

const vendorRouter = Router();

vendorRouter.post(
  "/test",
   validateApiKey,
  // validateAccessToken,
  siteValidation.userValidation.testDatacheck,
  siteController.userController.test,
);

vendorRouter.post(
  "/vendor-add",
  validateApiKey,
  validateAccessToken,
  siteValidation.vendorValidation.vendorAdd,
  siteController.vendorController.vendorAdd,
);

vendorRouter.post(
  "/list",
  validateApiKey,
  validateAccessToken,
  siteValidation.vendorValidation.vendorList,
  siteController.vendorController.vendorList,
);

vendorRouter.post(
  "/update/:id", // Employee ID in URL
  validateApiKey,
  validateAccessToken,
  siteValidation.vendorValidation.vendorUpdate,
  siteController.vendorController.vendorUpdate
);

vendorRouter.get(
  "/details/:id/:role",  // ID will come from URL
  validateApiKey,
  validateAccessToken,
  siteController.vendorController.getVendorDetails
);

vendorRouter.get(
  "/delete/:id",  // ID in URL param
  validateApiKey,
  validateAccessToken,
  siteController.vendorController.deleteVendor
);

vendorRouter.post(
  "/bulk-delete",
  validateApiKey,
  validateAccessToken,
  siteController.vendorController.bulkDeleteVendor,
);

export { vendorRouter };
