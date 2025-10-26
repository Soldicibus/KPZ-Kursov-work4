import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Teacher } from "../../orm/entities/Teachers/Teachers";

export default async (req: Request, res: Response) => {
  const repo = getRepository(Teacher);
  const result = await repo.delete(Number(req.params.id));
  if (result.affected === 0) return res.status(404).json({ message: "Teacher not found" });
  res.json({ message: "Teacher deleted" });
  return res.status(200);
};
