import { Router } from "express";
import { siteController } from "../../controllers/index.js";
import { productImageUpload, validateApiKey, validateAccessToken, accessTokenIfAny } from "../../middleware/index.js";
import { siteValidation } from "../../validations/index.js";
import multer from "multer"; 

const productRouter = Router();
// ✅ Configure multer (you can move this to a separate `upload.js` if needed)
const storage = multer.memoryStorage(); // or diskStorage if saving to file system
const upload = multer({ storage });

// productRouter.post(
//   "/add",
//    validateApiKey,
//    validateAccessToken,
//    productImageUpload.single("product_image"),   
//    siteValidation.productValidation.productAdd,
//    siteController.productController.productAdd,
// );

productRouter.post(
  "/add",
  validateApiKey,
  validateAccessToken,
  productImageUpload.array("product_images", 5), // multiple images
  siteValidation.productValidation.productAdd,
  siteController.productController.productAdd,
);

productRouter.post(
  "/update/:id",
  validateApiKey,
  validateAccessToken,
  productImageUpload.array("product_images", 5), // multiple images like add
  siteValidation.productValidation.productUpdate,
  siteController.productController.productUpdate
);

// productRouter.post(
//   "/update/:id", // Product ID in URL
//   validateApiKey,
//   validateAccessToken,
//   productImageUpload.single("product_image"),
//   siteValidation.productValidation.productUpdate,
//   siteController.productController.productUpdate
// );

productRouter.get(
  "/details/:id",  // ID will come from URL
  validateApiKey,
  validateAccessToken,
  siteController.productController.getProductDetails
);

productRouter.get(
  "/delete/:id",  // ID in URL param
  validateApiKey,
  validateAccessToken,
  siteController.productController.deleteProduct
);

productRouter.get(
  "/image-delete/:id/:imageId",  // ID in URL param
  validateApiKey,
  validateAccessToken,
  siteController.productController.deleteProductImage
);

productRouter.post(
  "/list",
   validateApiKey,
   validateAccessToken,   
   siteValidation.productValidation.productList,
   siteController.productController.productList,
);

export { productRouter };
