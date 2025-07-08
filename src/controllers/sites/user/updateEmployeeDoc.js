import { User } from "../../../models/User.js";

export const updateEmployeeDoc = async (req, res, next) => {
  try {
    const userId = req.userDetails.userId;

    // Extract filenames if uploaded
    const profileImage = req.files?.profile_image?.[0]?.filename;
    const aadharPhoto = req.files?.aadhar_photo?.[0]?.filename;

    // Build update object dynamically
    const updateData = {};
    if (profileImage) {
      updateData.profile_image = `uploads/employee-photo/${profileImage}`;
    }
    if (aadharPhoto) {
      updateData.staff_aadhar = `uploads/employee-photo/${aadharPhoto}`;
    }

    if (!profileImage && !aadharPhoto) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    updateData.updated_at = new Date();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    ).lean();

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.ok({
      message: "Profile and Aadhar images updated successfully",
      profile_image: updatedUser.profile_image,
      aadhar_photo: updatedUser.staff_aadhar
    });

  } catch (error) {
    console.error("Image update error:", error);
    next(error);
  }
};