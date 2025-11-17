import { Router } from "express";
import { createTeacher, getAllTeachers, getTeacherById, updateTeacher, deleteTeacher } from "controllers/teachers/teachers";

const router = Router();

router.post("/", createTeacher);
router.get("/", getAllTeachers);
router.get("/:id", getTeacherById);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);

export default router;
