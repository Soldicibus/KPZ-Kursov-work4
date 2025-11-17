import { Request, Response } from "express";
import { HomeworkService } from "../../services/HomeworkService";
import { HomeworkDTO } from "../../dto/HomeworkDTO";

const homeworkService = new HomeworkService();

export const createHomework = async (req: Request, res: Response) => {
  try {
    const homework = await homeworkService.createHomework(req.body);
    const homeworkDTO = new HomeworkDTO(homework);
    res.status(201).json({ message: "Homework created successfully", homework: homeworkDTO });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllHomeworks = async (_req: Request, res: Response) => {
  try {
    const homeworks = await homeworkService.getAllHomeworks();
    const homeworkDTOs = homeworks.map(homework => new HomeworkDTO(homework));
    res.status(200).json(homeworkDTOs);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getHomeworkById = async (req: Request, res: Response) => {
  try {
    const homework = await homeworkService.getHomeworkById(Number(req.params.id));
    const homeworkDTO = new HomeworkDTO(homework);
    res.status(200).json(homeworkDTO);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

export const updateHomework = async (req: Request, res: Response) => {
  try {
    const homework = await homeworkService.updateHomework(Number(req.params.id), req.body);
    const homeworkDTO = new HomeworkDTO(homework);
    res.status(200).json({ message: "Homework updated successfully", homework: homeworkDTO });
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