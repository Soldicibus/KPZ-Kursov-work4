import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Class } from '../../orm/entities/Class/Class';

export default async (req: Request, res: Response) => {
  const repo = getRepository(Class);
  const item = await repo.findOne(req.params.id);
  if (!item) return res.status(404).json({ message: 'Class not found' });
  repo.merge(item, req.body);
  await repo.save(item);
  res.json(item);
  return res.status(200).json({ message: 'Class found'});
};
