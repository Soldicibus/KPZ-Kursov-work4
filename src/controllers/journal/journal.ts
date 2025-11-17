import { Request, Response } from "express";
import { JournalService } from "services/JournalService";
import { JournalDTO } from "dto/JournalDTO";

const journalService = new JournalService();

export const createJournal = async (req: Request, res: Response) => {
  try {
    const journal = await journalService.createJournal(req.body);
    const journalDTO = new JournalDTO(journal);
    res.status(201).json({ message: "Journal created successfully", journal: journalDTO });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllJournals = async (_req: Request, res: Response) => {
  try {
    const journals = await journalService.getAllJournals();
    //const journalDTOs = journals.map(journal => new JournalDTO(journal));
    res.status(200).json(journals);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getJournalById = async (req: Request, res: Response) => {
  try {
    const journal = await journalService.getJournalById(Number(req.params.id));
    const journalDTO = new JournalDTO(journal);
    res.status(200).json(journalDTO);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateJournal = async (req: Request, res: Response) => {
  try {
    const journal = await journalService.updateJournal(Number(req.params.id), req.body);
    const journalDTO = new JournalDTO(journal);
    res.status(200).json({ message: "Journal updated successfully", journal: journalDTO });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteJournal = async (req: Request, res: Response) => {
  try {
    const result = await journalService.deleteJournal(Number(req.params.id));
    res.status(200).json(result);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};