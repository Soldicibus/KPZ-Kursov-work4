import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Journal } from "../../orm/entities/Journal/Journal";

export default async (_req: Request, res: Response) => {
  const repo = getRepository(Journal);
  const journals = await repo.find({ relations: ["journal_Students_id", "journal_time_id"] });
  res.json(journals);
};
