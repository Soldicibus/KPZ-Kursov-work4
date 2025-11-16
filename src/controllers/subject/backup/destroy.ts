import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Subject } from "../../../orm/entities/Subject/Subject";

export default async (req: Request, res: Response) => {
  const repo = getRepository(Subject);
  const result = await repo.delete({ subject_name: req.params.name });
  if (result.affected === 0) return res.status(404).json({ message: "Subject not found" });
  else return res.json({ message: "Subject deleted" });
};
