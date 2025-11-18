import { Router } from "express";
import { createTeacher, getAllTeachers, getTeacherById, updateTeacher, deleteTeacher } from "controllers/teachers/teachers";
import { validatorCreate as validatorCreateTeacher, validatorEdit as validatorEditTeacher } from 'middleware/validation/teacher';

const router = Router();

router.post("/", validatorCreateTeacher, createTeacher);
router.get("/", getAllTeachers);
router.get("/:id", getTeacherById);
router.put("/:id", validatorEditTeacher, updateTeacher);
router.delete("/:id", deleteTeacher);

export default router;
