import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from "database/data-source";

import { Subject } from '../../../orm/entities/Subject/Subject';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorEdit = async (req: Request, res: Response, next: NextFunction) => {
  let { subject_name, subject_desc } = req.body;
  const errorsValidation: ErrorValidation[] = [];
  const subjectRepository = AppDataSource.getRepository(Subject);

  const id = decodeURIComponent(req.params.name); // <-- IMPORTANT

  subject_name = subject_name ?? '';
  subject_desc = subject_desc ?? '';

  // SUBJECT NAME CHECK
  if (subject_name.trim() !== '') {
    if (subject_name.length > 30) {
      errorsValidation.push({ subject_name: 'Subject name must be 30 characters or less' });
    }

    const exists = await subjectRepository.findOne({ where: { subject_name } });
    if (exists && exists.subject_name !== id) {
      errorsValidation.push({ subject_name: `Subject with name '${subject_name}' already exists` });
    }
  }

  // SUBJECT DESCRIPTION CHECK
  if (subject_desc.trim() !== '') {
    const descExists = await subjectRepository.findOne({ where: { subject_desc } });
    if (descExists && descExists.subject_name !== id) {
      errorsValidation.push({ subject_desc: 'Subject description must be unique' });
    }
  }

  if (errorsValidation.length > 0) {
    return next(
      new CustomError(
        400,
        'Validation',
        'Edit subject validation error',
        null,
        null,
        errorsValidation
      )
    );
  }

  next();
};

export default validatorEdit;
