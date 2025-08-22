import multer from "multer";
import { storage } from "../config/cloudDailyConfig.js"; 

export const purchaseInvoiceUpload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});