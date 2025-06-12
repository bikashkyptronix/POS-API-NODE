import { Router } from "express";
import { siteController } from "../../controllers/index.js";
import { productImageUpload, validateApiKey, validateAccessToken, accessTokenIfAny } from "../../middleware/index.js";
import { siteValidation } from "../../validations/index.js";
import multer from "multer"; 

const productRouter = Router();
// ✅ Configure multer (you can move this to a separate `upload.js` if needed)
const storage = multer.memoryStorage(); // or diskStorage if saving to file system
const upload = multer({ storage });

productRouter.post(
  "/add",
   validateApiKey,
   validateAccessToken,
   productImageUpload.single("product_image"),   
   siteValidation.productValidation.productAdd,
   siteController.productController.productAdd,
);

export { productRouter };
