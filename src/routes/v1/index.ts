import { Router } from 'express';

import auth from './auth';
import users from './users';
import classRoutes from './class';
import parentsRoutes from './parents';
import studentsRoutes from './students';
import teachersRoutes from "./teachers";
import timetableRoutes from "./timetable";
import subjectRoutes from "./subject";
import homeworkRoutes from "./homework";
import journalRoutes from "./journal";

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/classes', classRoutes);
router.use("/parents", parentsRoutes);
router.use("/students", studentsRoutes);
router.use("/teachers", teachersRoutes);
router.use("/timetable", timetableRoutes);
router.use("/subject", subjectRoutes);
router.use("/homework", homeworkRoutes);
router.use("/journal", journalRoutes);


export default router;
