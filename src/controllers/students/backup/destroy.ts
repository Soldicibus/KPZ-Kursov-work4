import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Students } from "../../../orm/entities/Students/Students";

export default async (req: Request, res: Response) => {
  const repo = getRepository(Students);
  const result = await repo.delete(Number(req.params.id));
  if (result.affected === 0) return res.status(404).json({ message: "Student not found" });
  res.json({ message: "Student deleted" });
  return res.status(200);
};
