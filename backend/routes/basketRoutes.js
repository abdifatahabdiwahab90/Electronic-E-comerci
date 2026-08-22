import { Router } from "express";
import { getBasket, saveBasket } from "../controllers/basketController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = Router();
router.get("/", auth, getBasket);
router.put("/", auth, saveBasket);

export default router;
