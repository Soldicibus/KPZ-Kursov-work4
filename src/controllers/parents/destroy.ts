import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Parents } from "../../orm/entities/Parents/Parents";

export default async (req: Request, res: Response) => {
  const repo = getRepository(Parents);
  const result = await repo.delete(Number(req.params.id));
  if (result.affected === 0) return res.status(404).json({ message: "Parent not found" });
  else return res.json({ message: "Parent deleted" });
};
