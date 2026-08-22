import "dotenv/config";
import bcrypt from "bcryptjs";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { productsData as seedProducts } from "../src/data/category.js";
import User from "./models/userSchema.js";
import { seedProductsIfEmpty } from "./services/productService.js";
import activityRoutes from "./routes/activityRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import basketRoutes from "./routes/basketRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json({ limit: "3mb" }));

app.get("/api/health", (_, res) => res.json({ ok: true }));
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/basket", basketRoutes);

app.use((error, _, res, __) => {
  console.error(error);
  res.status(500).json({ message: "Server error." });
});

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    let adminUser = await User.findOne({ email: "admin@electroshop.com" });
    if (!adminUser) {
      adminUser = await User.findOne({ email: "admin@gmail.com" });
      if (adminUser) {
        adminUser.email = "admin@electroshop.com";
        await adminUser.save();
      }
    }
    if (!adminUser) {
      await User.create({
        name: "Admin",
        email: "admin@electroshop.com",
        passwordHash: await bcrypt.hash("admin123", 12),
        role: "admin",
      });
    }
    await seedProductsIfEmpty(seedProducts);
    app.listen(PORT, () => console.log(`API ready on port ${PORT}`));
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
