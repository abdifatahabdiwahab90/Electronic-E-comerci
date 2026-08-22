import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    id: { type: String, unique: true, required: true },
    catId: String,
    name: { type: String, required: true, trim: true },
    brand: String,
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0, default: 0 },
    rating: { type: Number, default: 4 },
    reviews: { type: Number, default: 0 },
    image: String,
    description: String,
    badge: String,
  },
  { timestamps: true, versionKey: false },
);

export default mongoose.models.Product || mongoose.model("Product", productSchema);
