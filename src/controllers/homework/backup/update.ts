import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Homework } from "../../../orm/entities/Homework/Homework";
import { Class } from "../../../orm/entities/Class/Class";
import { Subject } from "../../../orm/entities/Subject/Subject";

export default async (req: Request, res: Response) => {
  const repo = getRepository(Homework);
  const homework = await repo.findOne({ where: { homework_id: Number(req.params.id) } });
  if (!homework) return res.status(404).json({ message: "Homework not found" });

  const { className, subjectName, ...data } = req.body;

  if (className) {
    const classEntity = await getRepository(Class).findOne({ where: { class_name: className } });
    if (!classEntity) return res.status(404).json({ message: "Class not found" });
    homework.homework_Class = classEntity;
  }

  if (subjectName) {
    const subjectEntity = await getRepository(Subject).findOne({ where: { subject_name: subjectName } });
    if (!subjectEntity) return res.status(404).json({ message: "Subject not found" });
    homework.homework_Subject = subjectEntity;
  }

  Object.assign(homework, data);
  await repo.save(homework);
  res.json(homework);
  return res.status(200);
};
