import { User } from "../../../models/User.js";

export const updateBusinessLogo = async (req, res, next) => {
  try {
    const userId = req.userDetails.userId;

    if (!req.file) {
      return res.status(400).json({ message: "Business Logo is required" });
    }

    const imagePath = `uploads/business-logo/${req.file.filename}`;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        business_logo: imagePath,
        updated_at: new Date()
      },
      { new: true }
    ).lean();

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.ok({
      message: "Business Logo updated successfully",
      business_logo: updatedUser.business_logo
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};