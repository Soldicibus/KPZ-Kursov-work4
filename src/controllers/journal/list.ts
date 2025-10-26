import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Journal } from "../../orm/entities/Journal/Journal";

export default async (_req: Request, res: Response) => {
  const repo = getRepository(Journal);
  const journals = await repo.find({
    relations: [
      "journal_Student",
      "journal_Student.student_Class",
      "journal_time",
      "journal_time.time_Class",
      "journal_time.time_Subject_name",
      "journal_time.time_Teacher",
    ],
  });

  res.json(journals);
};
