import { Router } from "express";
import { createParent, getAllParents, getParentById, updateParent, deleteParent } from "controllers/parents/parents";

const router = Router();

router.post("/", createParent);
router.get("/", getAllParents);
router.get("/:id", getParentById);
router.put("/:id", updateParent);
router.delete("/:id", deleteParent);

export default router;
