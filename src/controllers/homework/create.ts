import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Homework } from "../../orm/entities/Homework/Homework";
import { Class } from "../../orm/entities/Class/Class";
import { Subject } from "../../orm/entities/Subject/Subject";

export default async (req: Request, res: Response) => {
  try {
    const { className, subjectName, homework_description, homework_duedate } = req.body;

    const classRepo = getRepository(Class);
    const subjectRepo = getRepository(Subject);
    const homeworkRepo = getRepository(Homework);

    const classEntity = await classRepo.findOne({ where: { class_name: className } });
    const subjectEntity = await subjectRepo.findOne({ where: { subject_name: subjectName } });

    if (!classEntity || !subjectEntity)
      return res.status(404).json({ error: "Class or Subject not found" });

    const homework = homeworkRepo.create({
      homework_Class: classEntity,
      homework_Subject: subjectEntity,
      homework_description,
      homework_duedate,
    });

    await homeworkRepo.save(homework);
    res.status(201).json(homework);
    return res.status(200);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
};
