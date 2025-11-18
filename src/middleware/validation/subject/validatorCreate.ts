import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from "database/data-source";

import { Subject } from '../../../orm/entities/Subject/Subject';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorCreate = async (req: Request, res: Response, next: NextFunction) => {
  let { subject_name, subject_desc } = req.body;

  subject_name = (subject_name || "").trim();
  subject_desc = (subject_desc || "").trim();

  const errorsValidation: ErrorValidation[] = [];
  const subjectRepository = AppDataSource.getRepository(Subject);

  subject_name = !subject_name ? '' : subject_name;
  subject_desc = !subject_desc ? '' : subject_desc;

  if (subject_name.trim() === '') {
    errorsValidation.push({ subject_name: 'Subject name is required' });
  } else if (subject_name.length > 30) {
    errorsValidation.push({ subject_name: 'Subject name must be 30 characters or less' });
  }

  if (subject_desc && subject_desc.length > 0) {
    const descExists = await subjectRepository.findOne({ where: { subject_desc } });
    if (descExists) {
      errorsValidation.push({ subject_desc: 'Subject description must be unique' });
    }
  }

  if (subject_name) {
    const exists = await subjectRepository.findOne({ where: { subject_name } });
    if (exists) {
      errorsValidation.push({ subject_name: `Subject with name '${subject_name}' already exists` });
    }
  }

  if (errorsValidation.length !== 0) {
    const customError = new CustomError(400, 'Validation', 'Create subject validation error', null, null, errorsValidation);
    return next(customError);
  }
  return next();
};

export default validatorCreate;
