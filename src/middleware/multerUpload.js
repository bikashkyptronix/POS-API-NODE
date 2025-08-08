import multer from "multer";
import { storage } from "../config/cloudinaryConfig.js"; 

export const productImageUpload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});
