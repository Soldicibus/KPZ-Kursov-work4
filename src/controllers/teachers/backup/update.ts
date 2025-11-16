import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Teacher } from "../../orm/entities/Teachers/Teachers";

export default async (req: Request, res: Response) => {
  const repo = getRepository(Teacher);
  const teacher = await repo.findOne({ where: { teacher_id: Number(req.params.id) } });
  if (!teacher) return res.status(404).json({ message: "Teacher not found" });

  repo.merge(teacher, req.body);
  await repo.save(teacher);
  res.json(teacher);
  return res.status(200);
};
