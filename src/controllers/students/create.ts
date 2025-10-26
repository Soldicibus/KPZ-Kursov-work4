import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Students } from "../../orm/entities/Students/Students";
import { Class } from "../../orm/entities/Class/Class";
import { Parents } from "../../orm/entities/Parents/Parents";

export default async (req: Request, res: Response) => {
  try {
    const studentRepo = getRepository(Students);
    const classRepo = getRepository(Class);
    const parentRepo = getRepository(Parents);

    const { student_Class, parents: parentIds, ...studentData } = req.body;

    // Find the class
    const foundClass = await classRepo.findOne({ where: { class_name: student_Class } });
    if (!foundClass) return res.status(400).json({ error: "Class not found" });

    // Find parents if provided
    let parentEntities = [];
    if (parentIds && Array.isArray(parentIds)) {
      parentEntities = await parentRepo.findByIds(parentIds);
    }

    const newStudent = studentRepo.create({
      ...studentData,
      student_Class: foundClass,
      parents: parentEntities,
    });

    await studentRepo.save(newStudent);
    res.status(201).json(newStudent);
    return res.status(200);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
};
