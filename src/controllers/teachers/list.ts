import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Teacher } from "../../orm/entities/Teachers/Teachers";

export default async (_req: Request, res: Response) => {
  const repo = getRepository(Teacher);
  const teachers = await repo.find({ relations: ["timetables", "teacher_class"] });
  res.json(teachers);
};
