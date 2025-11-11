import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Class } from '../../../orm/entities/Class/Class';

export default async (req: Request, res: Response) => {
  try {
    const repo = getRepository(Class);
    const newClass = repo.create(req.body);
    await repo.save(newClass);
    res.status(201).json(newClass);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
