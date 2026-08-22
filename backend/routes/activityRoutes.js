import { Router } from "express";
import { listActivity } from "../controllers/activityController.js";
import { admin } from "../middleware/authMiddleware.js";

const router = Router();
router.get("/", ...admin, listActivity);

export default router;
