import { Router } from "express";
import { createStudentParent, deleteStudentParent } from "../../controllers/studentParent/studentParent";

const router = Router();

router.post("/add", createStudentParent);       // Assign a parent to a student
router.post("/remove", deleteStudentParent); // Remove a parent from a student

export default router;
