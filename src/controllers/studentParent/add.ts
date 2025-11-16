import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Students } from "../../orm/entities/Students/Students";
import { Parents } from "../../orm/entities/Parents/Parents";

export default async (req: Request, res: Response) => {
  const { studentId, parentId } = req.body;
  if (!studentId || !parentId)
    return res.status(400).json({ error: "studentId and parentId are required" });

  const studentRepo = getRepository(Students);
  const parentRepo = getRepository(Parents);

  const student = await studentRepo.findOne({ 
    where: { student_id: studentId }, 
    relations: ["parents"] 
  });
  if (!student) return res.status(404).json({ error: "Student not found" });

  const parent = await parentRepo.findOne({ where: { parent_id: parentId } });
  if (!parent) return res.status(404).json({ error: "Parent not found" });

  if (!student.parents.some((p) => p.parent_id === parent.parent_id)) {
    student.parents.push(parent);
    await studentRepo.save(student);
  }

  res.json(student);
  return res.status(200);
};
