import { Request, Response } from "express";
import { TimetableService } from "services/TimetableService";

const timetableService = new TimetableService();

export const createTimetable = async (req: Request, res: Response) => {
  try {
    const timetable = await timetableService.createTimetableEntry(req.body);
    res.status(201).json({ message: "Timetable created successfully", timetable });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllTimetables = async (_req: Request, res: Response) => {
    try {
        const timetables = await timetableService.getAllTimetableEntries();
        res.status(200).json(timetables);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const getTimetableById = async (req: Request, res: Response) => {
  try {
    const timetable = await timetableService.getTimetableEntryById(Number(req.params.id));
    res.status(200).json(timetable);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

export const updateTimetable = async (req: Request, res: Response) => {
  try {
    const timetable = await timetableService.updateTimetableEntry(Number(req.params.id), req.body);
    res.status(200).json({ message: "Timetable updated successfully", timetable });
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