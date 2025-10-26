import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Timetable } from "../../orm/entities/Timetable/Timetable";
import { Class } from "../../orm/entities/Class/Class";
import { Subject } from "../../orm/entities/Subject/Subject";
import { Teacher } from "../../orm/entities/Teachers/Teachers";

export default async (req: Request, res: Response) => {
  try {
    const { classId, subjectName, teacherId, time_day_of_week, time_time } = req.body;

    const classRepo = getRepository(Class);
    const subjectRepo = getRepository(Subject);
    const teacherRepo = getRepository(Teacher);
    const timetableRepo = getRepository(Timetable);

    const classEntity = await classRepo.findOne({ where: { class_name: classId } });
    const subjectEntity = await subjectRepo.findOne({ where: { subject_name: subjectName } });
    const teacherEntity = await teacherRepo.findOne({ where: { teacher_id: teacherId } });

    if (!classEntity || !subjectEntity || !teacherEntity)
      return res.status(404).json({ error: "Class, Subject, or Teacher not found" });

    const timetable = timetableRepo.create({
      time_Class: classEntity,
      time_Subject_name: subjectEntity,
      time_Teacher_id: teacherEntity,
      time_day_of_week,
      time_time,
    });

    await timetableRepo.save(timetable);
    res.status(201).json(timetable);
    return res.status(200);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
};
