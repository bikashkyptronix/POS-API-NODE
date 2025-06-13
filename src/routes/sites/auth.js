import { Router } from "express";
import { siteController } from "../../controllers/index.js";
import { validateApiKey, validateAccessToken } from "../../middleware/index.js";
import { siteValidation } from "../../validations/index.js";
import mongoose from 'mongoose';


const authRouter = Router();

authRouter.get("/check-db",async(req,res)=>{
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
    console.log("✅ MongoDB connected successfully");
    return res.status(200).json({message:"connected"});
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    return res.status(200).json({message:"db not connected"});

  }
});


authRouter.post(
  "/signup",
  validateApiKey,
  siteValidation.authValidation.userSignup,
  siteController.authController.signup,
);

authRouter.post(
  "/check-email",
  validateApiKey,
  siteValidation.authValidation.checkEmail,
  siteController.authController.checkEmail,
);

authRouter.post(
  "/email-verify",
  validateApiKey,
  siteValidation.authValidation.emailVerify,
  siteController.authController.emailVerify,
);

authRouter.post(
  "/send-reset-verification-code",
  validateApiKey,
  siteValidation.authValidation.sendVerificationCodeToEmail,
  siteController.authController.sendVerificationCodeToEmail,
);

authRouter.post(
  "/check-verification-code",
  validateApiKey,
  siteValidation.authValidation.checkVerificationCode,
  siteController.authController.checkVerificationCode,
);

authRouter.post(
  "/setting-password",
  validateApiKey,
  siteValidation.authValidation.settingPassword,
  siteController.authController.settingPassword,
);

authRouter.post(
  "/change-password",
  validateApiKey,
  validateAccessToken,
  siteValidation.authValidation.changePassword,
  siteController.authController.changePassword,
);

authRouter.post(
  "/login",
  validateApiKey,
  siteValidation.authValidation.userLogin,
  siteController.authController.login,
);

export { authRouter };
