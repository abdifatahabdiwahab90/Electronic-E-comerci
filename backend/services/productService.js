import Product from "../models/productSchema.js";
import mongoose from "mongoose";

const IMAGE_SEED_VERSION = 2;

export const getProducts = () => Product.find().sort({ createdAt: -1 });

export const createProduct = (data) =>
  Product.create({
    ...data,
    id: `p-${Date.now()}`,
    price: Number(data.price),
    stock: Number(data.stock),
    rating: 4,
    reviews: 0,
  });

export const updateProduct = (id, data) =>
  Product.findOneAndUpdate({ id }, data, { new: true, runValidators: true });

export const deleteProduct = (id) => Product.findOneAndDelete({ id });

export const getProductsByIds = (ids) => Product.find({ id: { $in: ids } });

export const decreaseProductStock = (id, quantity) =>
  Product.updateOne({ id }, { $inc: { stock: -quantity } });

async function syncProductImages(products) {
  await Promise.all(
    products.map((product) =>
      Product.updateOne({ id: product.id }, { $set: { image: product.image } }),
    ),
  );
}

export const seedProductsIfEmpty = async (products) => {
  const count = await Product.countDocuments();
  const meta = mongoose.connection.db.collection("app_meta");
  const versionDoc = await meta.findOne({ key: "imageSeedVersion" });

  if (!count) {
    await Product.insertMany(
      products.map((product, index) => ({ ...product, stock: 10 + (index % 25) })),
    );
    await meta.updateOne(
      { key: "imageSeedVersion" },
      { $set: { value: IMAGE_SEED_VERSION } },
      { upsert: true },
    );
    return;
  }

  if (!versionDoc || versionDoc.value < IMAGE_SEED_VERSION) {
    await syncProductImages(products);
    await meta.updateOne(
      { key: "imageSeedVersion" },
      { $set: { value: IMAGE_SEED_VERSION } },
      { upsert: true },
    );
  }
};
