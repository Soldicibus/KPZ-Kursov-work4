import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Homework } from "../../../orm/entities/Homework/Homework";

export default async (_req: Request, res: Response) => {
  const repo = getRepository(Homework);
  const homework = await repo.find({
    relations: ["homework_Class", "homework_Subject"],
  });

  res.json(homework);
  return res.status(200);
};
