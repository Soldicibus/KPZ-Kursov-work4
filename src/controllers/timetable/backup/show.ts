import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Timetable } from "../../../orm/entities/Timetable/Timetable";

export default async (req: Request, res: Response) => {
  const repo = getRepository(Timetable);
  const timetable = await repo.findOne({
    where: { time_id: Number(req.params.id) },
    relations: ["time_Class", "time_Subject_name", "time_Teacher"],
  });
  if (!timetable) return res.status(404).json({ message: "Timetable entry not found" });
  res.json(timetable);
  return res.status(200);
};
