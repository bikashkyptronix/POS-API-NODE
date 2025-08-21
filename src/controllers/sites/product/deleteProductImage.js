import { Product } from "../../../models/Product.js";
import { ProductImage } from "../../../models/ProductImage.js";

export const deleteProductImage = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const imageId = req.params.imageId;

    // 1. Find product by ID & business (authorization check)
    const product = await Product.findOne({
      _id: productId,
      business_id: req.userDetails.business_id
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 2. Delete only the requested image
    const deletedImage = await ProductImage.findOneAndDelete({
      _id: imageId,
      product_id: productId
    });

    if (!deletedImage) {
      return res.status(404).json({ message: "Image not found" });
    }

    return res.ok({
      message: "Product image deleted successfully",
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};