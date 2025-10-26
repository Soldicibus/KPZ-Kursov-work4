import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Students } from "../../orm/entities/Students/Students";

export default async (req: Request, res: Response) => {
  const { studentId, parentId } = req.body;
  if (!studentId || !parentId)
    return res.status(400).json({ error: "studentId and parentId are required" });

  const studentRepo = getRepository(Students);

  const student = await studentRepo.findOne({ 
    where: { student_id: studentId }, 
    relations: ["parents"] 
  });
  if (!student) return res.status(404).json({ error: "Student not found" });

  student.parents = student.parents.filter((p) => p.parent_id !== parentId);
  await studentRepo.save(student);

  res.json(student);
  return res.status(200);
};
