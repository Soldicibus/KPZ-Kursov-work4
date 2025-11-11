import { Request, Response } from "express";
import { StudentService } from "../../services/StudentService";

const studentService = new StudentService();

export const createStudent = async (req: Request, res: Response) => {
  try {
    const student = await studentService.createStudent(req.body);
    res.status(201).json({ message: "Student created successfully", student });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllStudents = async (_req: Request, res: Response) => {
  try {
    const students = await studentService.getAllStudents();
    res.status(200).json(students);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = await studentService.getStudentById(Number(req.params.id));
    res.status(200).json(student);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const student = await studentService.updateStudent(Number(req.params.id), req.body);
    res.status(200).json({ message: "Student updated successfully", student });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const result = await studentService.deleteStudent(Number(req.params.id));
    res.status(200).json(result);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};
