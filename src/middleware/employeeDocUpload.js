// middlewares/uploadEmployeeDocs.js
import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure folder exists
const userImageDir = "./uploads/employee-photo";
if (!fs.existsSync(userImageDir)) {
  fs.mkdirSync(userImageDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, userImageDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const baseName = file.fieldname === "profile_image" ? "profile" : "aadhar";
    cb(null, `${baseName}_${Date.now()}${ext}`);
  }
});

const fileFilter = function (req, file, cb) {
  const allowed = /jpeg|jpg|png/;
  const isValid =
    allowed.test(file.mimetype) &&
    allowed.test(path.extname(file.originalname).toLowerCase());
  cb(isValid ? null : new Error("Only .jpeg, .jpg, .png are allowed"), isValid);
};

export const employeeDocUpload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter
});
