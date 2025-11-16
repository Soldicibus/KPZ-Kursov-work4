import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Teacher } from "../../../orm/entities/Teachers/Teachers";

export default async (req: Request, res: Response) => {
  const repo = getRepository(Teacher);
  const teacher = await repo.findOne({
    where: { teacher_id: Number(req.params.id) },
    relations: ["timetables", "teacher_class"],
  });
  if (!teacher) return res.status(404).json({ message: "Teacher not found" });
  res.json(teacher);
  return res.status(200);
};
