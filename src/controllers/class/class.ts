import { Request, Response } from 'express';
import { ClassService } from '../../services/ClassService';
import { ClassDTO } from '../../dto/ClassDTO';

const classService = new ClassService();

export const createClass = async (req: Request, res: Response) => {
  try {
    const newClass = await classService.createClass(req.body);
    const classDTO = new ClassDTO(newClass);
    res.status(201).json({ message: 'Class created successfully', class: classDTO });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllClasses = async (_req: Request, res: Response) => {
  try {
    const classes = await classService.getAllClasses();
    const classDTOs = classes.map(cls => new ClassDTO(cls));
    res.status(200).json(classDTOs);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getClassById = async (req: Request, res: Response) => {
  try {
    const foundClass = await classService.getClassById(String(req.params.name));
    const classDTO = new ClassDTO(foundClass);
    res.status(200).json(classDTO);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

export const updateClass = async (req: Request, res: Response) => {
  try {
    const updatedClass = await classService.updateClass(String(req.params.name), req.body);
    const classDTO = new ClassDTO(updatedClass);
    res.status(200).json({ message: 'Class updated successfully', class: classDTO });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteClass = async (req: Request, res: Response) => {
  try {
    const result = await classService.deleteClass(String(req.params.name));
    res.status(200).json(result);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};