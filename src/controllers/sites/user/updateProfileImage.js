import { User } from "../../../models/User.js";

export const updateProfileImage = async (req, res, next) => {
  try {
    const userId = req.userDetails.userId;

    if (!req.file) {
      return res.status(400).json({ message: "Profile image is required" });
    }

    const imagePath = `uploads/users/${req.file.filename}`;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profile_image: imagePath,
        updated_at: new Date()
      },
      { new: true }
    ).lean();

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.ok({
      message: "Profile image updated successfully",
      profile_image: updatedUser.profile_image
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};
