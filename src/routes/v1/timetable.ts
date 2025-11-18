import { Router } from "express";
import { createTimetable, getAllTimetables, getTimetableById, updateTimetable, deleteTimetable } from "controllers/timetable/timetable";
import { validatorCreate as validatorCreateTimetable, validatorEdit as validatorEditTimetable } from 'middleware/validation/timetable';

const router = Router();

router.post("/", validatorCreateTimetable, createTimetable);
router.get("/", getAllTimetables);
router.get("/:id", getTimetableById);
router.put("/:id", validatorEditTimetable, updateTimetable);
router.delete("/:id", deleteTimetable);

export default router;
