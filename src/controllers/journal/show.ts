import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Journal } from "../../orm/entities/Journal/Journal";

export default async (req: Request, res: Response) => {
  const repo = getRepository(Journal);
  const journal = await repo.findOne({
    where: { journal_id: Number(req.params.id) },
    relations: ["journal_Students_id", "journal_time_id"],
  });
  if (!journal) return res.status(404).json({ message: "Journal entry not found" });
  res.json(journal);
  return res.status(200);
};
