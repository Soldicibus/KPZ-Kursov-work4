import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from "database/data-source";

import { Subject } from '../../../orm/entities/Subject/Subject';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorEdit = async (req: Request, res: Response, next: NextFunction) => {
  let { subject_name, subject_desc } = req.body;
  const errorsValidation: ErrorValidation[] = [];
  const subjectRepository = AppDataSource.getRepository(Subject);

  subject_name = !subject_name ? '' : subject_name;
  subject_desc = !subject_desc ? '' : subject_desc;

  // If subject_name provided, validate length and uniqueness (allow when updating same record)
  if (subject_name && subject_name.trim() !== '') {
    if (subject_name.length > 30) {
      errorsValidation.push({ subject_name: 'Subject name must be 30 characters or less' });
    }

    const exists = await subjectRepository.findOne({ where: { subject_name } });
    if (exists && exists.subject_name !== req.params.id) {
      errorsValidation.push({ subject_name: `Subject with name '${subject_name}' already exists` });
    }
  }

  // If subject_desc provided, ensure uniqueness (allow same record)
  if (subject_desc && subject_desc.trim() !== '') {
    const descExists = await subjectRepository.findOne({ where: { subject_desc } });
    if (descExists && descExists.subject_name !== req.params.id) {
      errorsValidation.push({ subject_desc: 'Subject description must be unique' });
    }
  }

  if (errorsValidation.length !== 0) {
    const customError = new CustomError(400, 'Validation', 'Edit subject validation error', null, null, errorsValidation);
    return next(customError);
  }
  return next();
};

export default validatorEdit;
