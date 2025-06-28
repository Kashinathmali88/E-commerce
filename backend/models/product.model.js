import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: Array, required: true },
    brand: { type: String, required: true },
    sizes: { type: Array },
    bestSeller: { type: Boolean },
    date: { type: Number, required: true, default: Date.now },
  },
  { timestamps: true }
);

const Products =
  mongoose.model.Products || mongoose.model("Products", productSchema);
export default Products;
