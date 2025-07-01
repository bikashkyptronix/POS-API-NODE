import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure folder exists
const userImageDir = "./uploads/users";
if (!fs.existsSync(userImageDir)) {
  fs.mkdirSync(userImageDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/users");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, "user_" + Date.now() + ext);
  }
});

export const profileImageUpload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter: function (req, file, cb) {
    const allowed = /jpeg|jpg|png/;
    const isValid = allowed.test(file.mimetype) && allowed.test(path.extname(file.originalname).toLowerCase());
    cb(isValid ? null : new Error("Only .jpeg, .jpg, .png are allowed"), isValid);
  }
});
