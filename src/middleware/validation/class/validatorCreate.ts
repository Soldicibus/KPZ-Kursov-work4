import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from "database/data-source";

import { Class } from '../../../orm/entities/Class/Class';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

const CLASS_NAME_REGEX = /^(?:[1-9]|1[01])-([А-ЩЬЮЯҐЄІЇ]|[а-щьюяґєії])$/;

export const validatorCreate = async (req: Request, res: Response, next: NextFunction) => {
  let { class_name } = req.body;
  const errorsValidation: ErrorValidation[] = [];
  const classRepository = AppDataSource.getRepository(Class);

  class_name = !class_name ? '' : class_name;

  if (!class_name || class_name.trim() === '') {
    errorsValidation.push({ class_name: 'Class name is required' });
  } else if (!CLASS_NAME_REGEX.test(class_name)) {
    errorsValidation.push({ class_name: 'Class name format is invalid. Expected e.g. "10-А" or "1-Б"' });
  }

  if (class_name) {
    const exists = await classRepository.findOne({ where: { class_name } });
    if (exists) {
      errorsValidation.push({ class_name: `Class with name '${class_name}' already exists` });
    }
  }

  if (errorsValidation.length !== 0) {
    const customError = new CustomError(400, 'Validation', 'Create class validation error', null, null, errorsValidation);
    return next(customError);
  }

  return next();
};

export default validatorCreate;
