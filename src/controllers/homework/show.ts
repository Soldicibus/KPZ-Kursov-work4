import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Homework } from "../../orm/entities/Homework/Homework";

export default async (req: Request, res: Response) => {
  const repo = getRepository(Homework);
  const homework = await repo.findOne({
    where: { homework_id: Number(req.params.id) },
    relations: ["homework_Class", "homework_Subject"],
  });

  if (!homework) return res.status(404).json({ message: "Homework not found" });
  res.json(homework);
  return res.status(200);
};
