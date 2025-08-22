import { envs } from "./index.js";
// cloudinaryConfig.js
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: envs.CLOUD_NAME,
  api_key: envs.CLOUD_API_KEY,
  api_secret: envs.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'daily', // Cloudinary folder name
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    public_id: (req, file) => {
      const timestamp = Date.now();
      return `daily-invoice-${timestamp}`;
    },
  },
});

export { cloudinary, storage };
