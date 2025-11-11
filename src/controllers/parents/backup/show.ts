import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Parents } from "../../../orm/entities/Parents/Parents";

export default async (req: Request, res: Response) => {
  const repo = getRepository(Parents);
  const parent = await repo.findOne({
    where: { parent_id: Number(req.params.id) },
    relations: ["students"],
  });
  if (!parent) return res.status(404).json({ message: "Parent not found" });
  res.json(parent);
  return res.status(200);
};
