import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Journal } from "../../../orm/entities/Journal/Journal";
import { Students } from "../../../orm/entities/Students/Students";
import { Timetable } from "../../../orm/entities/Timetable/Timetable";

export default async (req: Request, res: Response) => {
  try {
    const { studentId, timeId, journal_mark, journal_note, journal_status } = req.body;

    const studentRepo = getRepository(Students);
    const timetableRepo = getRepository(Timetable);
    const journalRepo = getRepository(Journal);

    const student = await studentRepo.findOne({ where: { student_id: studentId } });
    const time = await timetableRepo.findOne({ where: { time_id: timeId } });

    if (!student || !time) return res.status(404).json({ error: "Student or Timetable entry not found" });

    const journal = journalRepo.create({
      journal_Students_id: student,
      journal_time_id: time,
      journal_mark,
      journal_note,
      journal_status,
    });

    await journalRepo.save(journal);
    res.status(201).json(journal);
    return res.status(200);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
    return res.status(400);
  }
};
