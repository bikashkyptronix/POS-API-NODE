import { Group } from "../../../models/Group.js";
import { User } from "../../../models/User.js";

export const getGroupDetail = async (req, res, next) => {
  try {
    const { id } = req.params;

    const checkGroup = await Group.findOne({
      _id: id,
      status: "active"
    })
      .populate("products", "product_name") // only fetch product_name from Product
      .lean();

    if (!checkGroup) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Get created user name
    let createdUserName = "";
    if (checkGroup.created_by) {
      const createdUserDetails = await User.findById(checkGroup.created_by).lean();
      createdUserName = createdUserDetails?.full_name || "";
    }

    const result = {
      id: checkGroup._id,
      group_name: checkGroup.group_name,
      products: checkGroup.products.map(p => ({
        id: p._id,
        name: p.product_name
      })), // return product names
      createdBy: createdUserName,
      status: checkGroup.status,
      created_at: checkGroup.createdAt,
      updated_at: checkGroup.updatedAt
    };

    return res.ok({
      message: "Group details fetched successfully",
      groupDetails: result
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};