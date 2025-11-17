import { Router } from "express";
import { createSubject, getSubjectById, getAllSubjects, updateSubject, deleteSubject } from "controllers/subject/subject";
const router = Router();

router.post("/", createSubject);
router.get("/", getAllSubjects);
router.get("/:name", getSubjectById);
router.put("/:name", updateSubject);
router.delete("/:name", deleteSubject);

export default router;
