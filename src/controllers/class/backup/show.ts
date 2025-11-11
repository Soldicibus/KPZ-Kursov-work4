import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Class } from '../../../orm/entities/Class/Class';

export default async (req: Request, res: Response) => {
  const repo = getRepository(Class);
  const item = await repo.findOne(req.params.id);
  if (!item) return res.status(404).json({ message: 'Class not found' });
  else return res.json(item);
};
