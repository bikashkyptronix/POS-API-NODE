import { Product } from "../../../models/Product.js";

export const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;

    const product = await Product.findOne({
      _id: productId,
      business_id: req.userDetails.business_id
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.status = "inactive";
    product.updated_by = req.userDetails.userId;
    await product.save();

    return res.ok({
      message: "Product deleted successfully",
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};
