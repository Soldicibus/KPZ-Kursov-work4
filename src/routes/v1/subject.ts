import { Router } from "express";
import { createSubject, getSubjectById, getAllSubjects, updateSubject, deleteSubject } from "controllers/subject/subject";
import { validatorCreate as validatorCreateSubject, validatorEdit as validatorEditSubject } from 'middleware/validation/subject';

const router = Router();

router.post("/", validatorCreateSubject, createSubject);
router.get("/", getAllSubjects);
router.get("/:name", getSubjectById);
router.put("/:name", validatorEditSubject, updateSubject);
router.delete("/:name", deleteSubject);

export default router;
