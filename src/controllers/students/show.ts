import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Students } from "../../orm/entities/Students/Students";

export default async (req: Request, res: Response) => {
  const repo = getRepository(Students);
  const student = await repo.findOne({
    where: { student_id: Number(req.params.id) },
    relations: ["student_Class", "parents"],
  });
  if (!student) return res.status(404).json({ message: "Student not found" });
  res.json(student);
  return res.status(200);
};
