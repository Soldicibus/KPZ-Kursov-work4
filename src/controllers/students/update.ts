import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Students } from "../../orm/entities/Students/Students";
import { Class } from "../../orm/entities/Class/Class";
import { Parents } from "../../orm/entities/Parents/Parents";

export default async (req: Request, res: Response) => {
  const studentRepo = getRepository(Students);
  const classRepo = getRepository(Class);
  const parentRepo = getRepository(Parents);

  const student = await studentRepo.findOne({
    where: { student_id: Number(req.params.id) },
    relations: ["parents", "student_Class"],
  });
  if (!student) return res.status(404).json({ message: "Student not found" });

  const { student_Class, parents: parentIds, ...data } = req.body;

  if (student_Class) {
    const foundClass = await classRepo.findOne({ where: { class_name: student_Class } });
    if (!foundClass) return res.status(400).json({ error: "Class not found" });
    student.student_Class = foundClass;
  }

  if (parentIds && Array.isArray(parentIds)) {
    const parentEntities = await parentRepo.findByIds(parentIds);
    student.parents = parentEntities;
  }

  studentRepo.merge(student, data);
  await studentRepo.save(student);
  res.json(student);
  return res.status(200);
};
