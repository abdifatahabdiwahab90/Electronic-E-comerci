import { Router } from "express";
import { createOrder, listMyOrders, listOrders, updateOrderStatus } from "../controllers/orderController.js";
import { admin, auth } from "../middleware/authMiddleware.js";

const router = Router();
router.get("/", ...admin, listOrders);
router.get("/mine", auth, listMyOrders);
router.post("/", auth, createOrder);
router.patch("/:id/status", ...admin, updateOrderStatus);

export default router;
