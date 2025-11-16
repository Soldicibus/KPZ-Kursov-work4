import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Journal } from "../../../orm/entities/Journal/Journal";

export default async (req: Request, res: Response) => {
  const repo = getRepository(Journal);
  const result = await repo.delete(Number(req.params.id));
  if (result.affected === 0) return res.status(404).json({ message: "Journal entry not found" });
  res.json({ message: "Journal entry deleted" });
  return res.status(200);
};
