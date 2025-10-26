import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Parents } from "../../orm/entities/Parents/Parents";
import { Students } from "../../orm/entities/Students/Students";

export default async (req: Request, res: Response) => {
  const parentRepo = getRepository(Parents);
  const studentRepo = getRepository(Students);

  const parent = await parentRepo.findOne({
    where: { parent_id: Number(req.params.id) },
    relations: ["students"],
  });
  if (!parent) return res.status(404).json({ message: "Parent not found" });

  const { students: studentIds, ...data } = req.body;

  if (studentIds && Array.isArray(studentIds)) {
    const studentEntities = await studentRepo.findByIds(studentIds);
    parent.students = studentEntities;
  }

  parentRepo.merge(parent, data);
  await parentRepo.save(parent);
  res.json(parent);
  return res.status(200);
};
