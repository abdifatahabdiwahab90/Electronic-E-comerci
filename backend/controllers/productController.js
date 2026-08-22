import { logActivity } from "../services/activityService.js";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../services/productService.js";

export const listProducts = async (_, res, next) => {
  try { res.json(await getProducts()); } catch (error) { next(error); }
};

export const addProduct = async (req, res, next) => {
  try { const product = await createProduct(req.body); await logActivity(`New product: ${product.name}`, "product"); res.status(201).json(product); } catch (error) { next(error); }
};

export const editProduct = async (req, res, next) => {
  try { const product = await updateProduct(req.params.id, req.body); if (!product) return res.status(404).json({ message: "Product not found." }); await logActivity(`Updated: ${product.name}`, "product"); res.json(product); } catch (error) { next(error); }
};

export const removeProduct = async (req, res, next) => {
  try { const product = await deleteProduct(req.params.id); if (!product) return res.status(404).json({ message: "Product not found." }); await logActivity(`Deleted: ${product.name}`, "product"); res.status(204).end(); } catch (error) { next(error); }
};
