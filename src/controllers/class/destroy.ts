import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Class } from '../../orm/entities/Class/Class';

export default async (req: Request, res: Response) => {
  const repo = getRepository(Class);
  const result = await repo.delete(req.params.id);
  if (result.affected === 0) return res.status(404).json({ message: 'Class not found' });
  else return res.json({ message: 'Class deleted' });
};
