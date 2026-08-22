import { Router } from "express";
import { addProduct, editProduct, listProducts, removeProduct } from "../controllers/productController.js";
import { admin } from "../middleware/authMiddleware.js";

const router = Router();
router.get("/", listProducts);
router.post("/", ...admin, addProduct);
router.patch("/:id", ...admin, editProduct);
router.delete("/:id", ...admin, removeProduct);

export default router;
