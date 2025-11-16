import { Request, Response } from "express";
import { TeacherService } from "services/TeacherService";

const teacherService = new TeacherService();

export const createTeacher = async (req: Request, res: Response) => {
  try {
    const teacher = await teacherService.createTeacher(req.body);
    res.status(201).json({ message: "Teacher created successfully", teacher });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllTeachers = async (_req: Request, res: Response) => {
  try {
    const teachers = await teacherService.getAllTeachers();
    res.status(200).json(teachers);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getTeacherById = async (req: Request, res: Response) => {
  try {
    const teacher = await teacherService.getTeacherById(Number(req.params.id));
    res.status(200).json(teacher);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

export const updateTeacher = async (req: Request, res: Response) => {
  try {
    const teacher = await teacherService.updateTeacher(Number(req.params.id), req.body);
    res.status(200).json({ message: "Teacher updated successfully", teacher });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteTeacher = async (req: Request, res: Response) => {
  try {
    const result = await teacherService.deleteTeacher(Number(req.params.id));
    res.status(200).json(result);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};