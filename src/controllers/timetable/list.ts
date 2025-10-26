import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Timetable } from "../../orm/entities/Timetable/Timetable";

export default async (_req: Request, res: Response) => {
  const repo = getRepository(Timetable);
  const timetable = await repo.find({ relations: ["time_Class", "time_Subject_name", "time_Teacher"] });
  res.json(timetable);
};
