import { v2 as cloudinary } from "cloudinary";
import Products from "../models/product.model.js";

// function for adding product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, brand, sizes, bestSeller } = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    if (imagesUrl.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const productData = {
      name,
      description,
      price: Number(price),
      brand,
      bestSeller: bestSeller === "true" ? true : false,
      sizes: JSON.parse(JSON.parse(sizes)),
      image: imagesUrl,
      date: Date.now(),
    };

    console.log(productData);

    const product = await Products.create(productData);
    if (!product) {
      return res.status(400).json({ message: "Failed to add product" });
    }
    res.status(200).json({ success: true, product, message: "Product added" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// function for listing product
const listProduct = async (req, res) => {
  try {
    const product = await Products.find({});
    res.json({ success: true, product });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// function for single product
const singleProduct = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Products.findOne({ _id: id });
    res.json({ success: true, product });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// function for removing product
const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Products.findByIdAndDelete({ _id: id });
    if (!product) {
      return res.json({ success: false, message: "all ready deleted" });
    }
    return res.json({ success: true, product, message: "deleted the product" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { addProduct, listProduct, singleProduct, removeProduct };
