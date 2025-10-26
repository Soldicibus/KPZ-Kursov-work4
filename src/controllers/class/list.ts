import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Class } from '../../orm/entities/Class/Class';

export default async (_req: Request, res: Response) => {
  const repo = getRepository(Class);
  const classes = await repo.find();
  res.json(classes);
};
