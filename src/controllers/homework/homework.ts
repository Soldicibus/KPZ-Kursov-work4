import { Request, Response } from "express";
import { HomeworkService } from "../../services/HomeworkService";

const homeworkService = new HomeworkService();

export const createHomework = async (req: Request, res: Response) => {
  try {
    const homework = await homeworkService.createHomework(req.body);
    res.status(201).json({ message: "Homework created successfully", homework });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllHomeworks = async (_req: Request, res: Response) => {
  try {
    const homeworks = await homeworkService.getAllHomeworks();
    res.status(200).json(homeworks);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getHomeworkById = async (req: Request, res: Response) => {
  try {
    const homework = await homeworkService.getHomeworkById(Number(req.params.id));
    res.status(200).json(homework);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

export const updateHomework = async (req: Request, res: Response) => {
  try {
    const homework = await homeworkService.updateHomework(Number(req.params.id), req.body);
    res.status(200).json({ message: "Homework updated successfully", homework });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteHomework = async (req: Request, res: Response) => {
  try {
    const result = await homeworkService.deleteHomework(Number(req.params.id));
    res.status(200).json(result);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};