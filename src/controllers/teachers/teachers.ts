import { Request, Response } from "express";
import { TeacherService } from "services/TeacherService";
import { TeacherDTO } from "dto/TeacherDTO";

const teacherService = new TeacherService();

export const createTeacher = async (req: Request, res: Response) => {
  try {
    const teacher = await teacherService.createTeacher(req.body);
    const teacherDTO = new TeacherDTO(teacher);
    res.status(201).json(teacherDTO);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllTeachers = async (_req: Request, res: Response) => {
  try {
    const teachers = await teacherService.getAllTeachers();
    const teacherDTOs = teachers.map(teacher => new TeacherDTO(teacher));
    res.status(200).json(teacherDTOs);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getTeacherById = async (req: Request, res: Response) => {
  try {
    const teacher = await teacherService.getTeacherById(Number(req.params.id));
    const teacherDTO = new TeacherDTO(teacher);
    res.status(200).json(teacherDTO);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

export const updateTeacher = async (req: Request, res: Response) => {
  try {
    const teacher = await teacherService.updateTeacher(Number(req.params.id), req.body);
    const teacherDTO = new TeacherDTO(teacher);
    res.status(200).json(teacherDTO);
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