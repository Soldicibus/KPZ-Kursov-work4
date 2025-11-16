import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Timetable } from "../../../orm/entities/Timetable/Timetable";
import { Class } from "../../../orm/entities/Class/Class";
import { Subject } from "../../../orm/entities/Subject/Subject";
import { Teacher } from "../../../orm/entities/Teachers/Teachers";

export default async (req: Request, res: Response) => {
  const repo = getRepository(Timetable);
  const timetable = await repo.findOne({ where: { time_id: Number(req.params.id) } });
  if (!timetable) return res.status(404).json({ message: "Timetable entry not found" });

  const { classId, subjectName, teacherId, ...data } = req.body;

  if (classId) {
    const classEntity = await getRepository(Class).findOne({ where: { class_name: classId } });
    if (!classEntity) return res.status(404).json({ message: "Class not found" });
    timetable.time_Class = classEntity;
  }

  if (subjectName) {
    const subjectEntity = await getRepository(Subject).findOne({ where: { subject_name: subjectName } });
    if (!subjectEntity) return res.status(404).json({ message: "Subject not found" });
    timetable.time_Subject_name = subjectEntity;
  }

  if (teacherId) {
    const teacherEntity = await getRepository(Teacher).findOne({ where: { teacher_id: teacherId } });
    if (!teacherEntity) return res.status(404).json({ message: "Teacher not found" });
    timetable.time_Teacher_id = teacherEntity;
  }

  Object.assign(timetable, data);
  await repo.save(timetable);
  res.json(timetable);
  return res.status(200);
};
