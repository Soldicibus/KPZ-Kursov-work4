import { Router } from "express";
import { createStudent, getAllStudents, getStudentById, updateStudent, deleteStudent } from "controllers/students/students";

const router = Router();

router.post("/", createStudent);
router.get("/", getAllStudents);
router.get("/:id", getStudentById);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;
