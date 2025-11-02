import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Subject } from "../../orm/entities/Subject/Subject";

export default async (_req: Request, res: Response) => {
  const repo = getRepository(Subject);
  const subjects = await repo.find({ relations: ["homeworks", "timetables"] });
  res.json(subjects);
};
