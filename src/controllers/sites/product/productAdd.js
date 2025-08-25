import { Product } from "../../../models/Product.js";
import { ProductImage } from "../../../models/ProductImage.js";
import { StatusError } from "../../../config/index.js";

export const productAdd = async (req, res, next) => {
  try {
    const userId = req.userDetails.userId;

    if (req.body.stock_code) {
        const duplicate = await Product.findOne({
          stock_code: req.body.stock_code
        });

        if (duplicate) {
            return res.status(400).json({ message: "Product stock code already exists" });
        }
    }

    // Save Product
    const newProduct = new Product({
      ...req.body,
      business_id: req.userDetails.business_id || null,
      created_by: userId,
      updated_by: userId,
    });

    const savedProduct = await newProduct.save();

    // Save images in ProductImage collection
    if (req.files && req.files.length > 0) {
      const images = req.files.map((file) => ({
        product_id: savedProduct._id,
        image_url: file.path, // Cloudinary URL
        created_by: userId,
      }));

      await ProductImage.insertMany(images);
    }

    res.ok({
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern?.product_sku) {
      return res.status(400).json({ message: "Product SKU must be unique" });
    }
    console.error(error);
    next(error);
  }
};