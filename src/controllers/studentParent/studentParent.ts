import { Request, Response } from "express";
import { StudentParentService } from "services/StudentParentService";

const studentParentService = new StudentParentService();

export const createStudentParent = async (req: Request, res: Response) => {
  try {
    const studentParent = await studentParentService.createStudentParent(req.body);
    res.status(201).json({ message: "Student-Parent relationship created successfully", studentParent });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteStudentParent = async (req: Request, res: Response) => {
  try {
    const result = await studentParentService.deleteStudentParent(Number(req.params.studentId), Number(req.params.parentId));
    res.status(200).json(result);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};