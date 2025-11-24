import { Request, Response } from "express";
import { TimetableService } from "services/TimetableService";
import { TimetableDTO } from "dto/TimetableDTO";

const timetableService = new TimetableService();

export const createTimetable = async (req: Request, res: Response) => {
  try {
    const timetable = await timetableService.createTimetableEntry(req.body);
    const timetableDTO = new TimetableDTO(timetable);
    res.status(201).json(timetableDTO);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllTimetables = async (_req: Request, res: Response) => {
    try {
        const timetables = await timetableService.getAllTimetableEntries();
        const timetableDTOs = timetables.map(timetable => new TimetableDTO(timetable));
        res.status(200).json(timetableDTOs);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const getTimetableById = async (req: Request, res: Response) => {
  try {
    const timetable = await timetableService.getTimetableEntryById(Number(req.params.id));
    const timetableDTO = new TimetableDTO(timetable);
    res.status(200).json(timetableDTO);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

export const updateTimetable = async (req: Request, res: Response) => {
  try {
    const timetable = await timetableService.updateTimetableEntry(Number(req.params.id), req.body);
    const timetableDTO = new TimetableDTO(timetable);
    res.status(200).json(timetableDTO);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteTimetable = async (req: Request, res: Response) => {
  try {
    const result = await timetableService.deleteTimetableEntry(Number(req.params.id));
    res.status(200).json(result);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};