import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Subject } from "../../orm/entities/Subject/Subject";

export default async (req: Request, res: Response) => {
  try {
    const repo = getRepository(Subject);
    const subject = repo.create(req.body);
    await repo.save(subject);
    res.status(201).json(subject);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
