import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Subject } from "../../orm/entities/Subject/Subject";

export default async (req: Request, res: Response) => {
  const repo = getRepository(Subject);
  const subject = await repo.findOne({
    where: { subject_name: req.params.name },
    relations: ["homework", "timetable"],
  });
  if (!subject) return res.status(404).json({ message: "Subject not found" });
  res.json(subject);
  return res.status(200);
};
