import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Timetable } from "../../../orm/entities/Timetable/Timetable";

export default async (req: Request, res: Response) => {
  const repo = getRepository(Timetable);
  const result = await repo.delete(Number(req.params.id));
  if (result.affected === 0) return res.status(404).json({ message: "Timetable entry not found" });
  else return res.json({ message: "Timetable entry deleted" });
};
