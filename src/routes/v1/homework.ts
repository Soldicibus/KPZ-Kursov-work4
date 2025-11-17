import { Router } from "express";
import { createHomework, updateHomework, getAllHomeworks, getHomeworkById, deleteHomework } from "controllers/homework/homework";

const router = Router();

router.post("/", createHomework);
router.get("/", getAllHomeworks);
router.get("/:id", getHomeworkById);
router.put("/:id", updateHomework);
router.delete("/:id", deleteHomework);

export default router;
