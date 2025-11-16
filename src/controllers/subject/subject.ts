import { Request, Response } from "express";
import { SubjectService } from "services/SubjectService";

const subjectService = new SubjectService();

export const createSubject = async (req: Request, res: Response) => {
  try {
    const subject = await subjectService.createSubject(req.body);
    res.status(201).json({ message: "Subject created successfully", subject });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllSubjects = async (_req: Request, res: Response) => {
  try {
    const subjects = await subjectService.getAllSubjects();
    res.status(200).json(subjects);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getSubjectById = async (req: Request, res: Response) => {
  try {
    const subject = await subjectService.getSubjectById(String(req.params.name));
    res.status(200).json(subject);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

export const updateSubject = async (req: Request, res: Response) => {
  try {
    const subject = await subjectService.updateSubject(String(req.params.name), req.body);
    res.status(200).json({ message: "Subject updated successfully", subject });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteSubject = async (req: Request, res: Response) => {
  try {
    const result = await subjectService.deleteSubject(String(req.params.name));
    res.status(200).json(result);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};