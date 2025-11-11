import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Parents } from "../../../orm/entities/Parents/Parents";
import { Students } from "../../../orm/entities/Students/Students";

export default async (req: Request, res: Response) => {
  try {
    const parentRepo = getRepository(Parents);
    const studentRepo = getRepository(Students);

    const { students: studentIds, ...parentData } = req.body;

    // Find students if provided
    let studentEntities = [];
    if (studentIds && Array.isArray(studentIds)) {
      studentEntities = await studentRepo.findByIds(studentIds);
    }

    const newParent = parentRepo.create({
      ...parentData,
      students: studentEntities,
    });

    await parentRepo.save(newParent);
    res.status(201).json(newParent);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
