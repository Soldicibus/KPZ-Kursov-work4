import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Teacher } from "../../orm/entities/Teachers/Teachers";

export default async (req: Request, res: Response) => {
  try {
    const teacherRepo = getRepository(Teacher);
    const teacher = teacherRepo.create(req.body);
    await teacherRepo.save(teacher);
    res.status(201).json(teacher);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
