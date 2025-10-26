import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Parents } from "../../orm/entities/Parents/Parents";

export default async (_req: Request, res: Response) => {
  const repo = getRepository(Parents);
  const parents = await repo.find({ relations: ["students"] });
  res.json(parents);
};
