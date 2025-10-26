import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Journal } from "../../orm/entities/Journal/Journal";
import { Students } from "../../orm/entities/Students/Students";
import { Timetable } from "../../orm/entities/Timetable/Timetable";

export default async (req: Request, res: Response) => {
  const repo = getRepository(Journal);
  const journal = await repo.findOne({ where: { journal_id: Number(req.params.id) } });
  if (!journal) return res.status(404).json({ message: "Journal entry not found" });

  const { studentId, timeId, ...data } = req.body;

  if (studentId) {
    const student = await getRepository(Students).findOne({ where: { student_id: studentId } });
    if (!student) return res.status(404).json({ message: "Student not found" });
    journal.journal_Students_id = student;
  }

  if (timeId) {
    const time = await getRepository(Timetable).findOne({ where: { time_id: timeId } });
    if (!time) return res.status(404).json({ message: "Timetable entry not found" });
    journal.journal_time_id = time;
  }

  Object.assign(journal, data);
  await repo.save(journal);
  res.json(journal);
  return res.status(200);
};
