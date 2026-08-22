import { Router } from "express";
import { createContact, listContacts, removeContact, updateContactStatus } from "../controllers/contactController.js";
import { admin } from "../middleware/authMiddleware.js";

const router = Router();
router.get("/", ...admin, listContacts);
router.post("/", createContact);
router.patch("/:id/status", ...admin, updateContactStatus);
router.delete("/:id", ...admin, removeContact);

export default router;
