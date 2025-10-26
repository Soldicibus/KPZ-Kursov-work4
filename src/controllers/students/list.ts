import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Students } from "../../orm/entities/Students/Students";

export default async (_req: Request, res: Response) => {
  const repo = getRepository(Students);
  const students = await repo.find({ relations: ["student_Class", "parents"] });
  res.json(students);
};
