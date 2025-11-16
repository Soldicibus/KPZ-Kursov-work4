import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from "database/data-source";
import validator from 'validator';

import { Teacher } from '../../../orm/entities/Teachers/Teachers';
import { Class } from '../../../orm/entities/Class/Class';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

const PHONE_REGEX = /^0[3-9][0-9]-[0-9]{3}-[0-9]{4}$/;

export const validatorCreate = async (req: Request, res: Response, next: NextFunction) => {
  let { teacher_surname, teacher_name, teacher_patronymic, teacher_phone, teacher_email, teacher_Class } = req.body;
  const errorsValidation: ErrorValidation[] = [];
  const teacherRepository = AppDataSource.getRepository(Teacher);
  const classRepository = AppDataSource.getRepository(Class);

  teacher_surname = !teacher_surname ? '' : String(teacher_surname).trim();
  teacher_name = !teacher_name ? '' : String(teacher_name).trim();
  teacher_patronymic = !teacher_patronymic ? '' : String(teacher_patronymic).trim();
  teacher_phone = !teacher_phone ? '' : String(teacher_phone).trim();
  teacher_email = !teacher_email ? '' : String(teacher_email).trim();
  teacher_Class = !teacher_Class ? '' : String(teacher_Class).trim();

  if (teacher_surname === '') {
    errorsValidation.push({ teacher_surname: 'Teacher surname is required' });
  }

  if (teacher_name === '') {
    errorsValidation.push({ teacher_name: 'Teacher name is required' });
  }

  if (teacher_Class === '') {
    errorsValidation.push({ teacher_Class: 'Teacher class (class_name) is required' });
  } else {
    const classEntity = await classRepository.findOne({ where: { class_name: teacher_Class } });
    if (!classEntity) {
      errorsValidation.push({ teacher_Class: `Class '${teacher_Class}' not found` });
    }
  }

  if (teacher_email && !validator.isEmail(teacher_email)) {
    errorsValidation.push({ teacher_email: 'Email is invalid' });
  }

  if (teacher_phone && !PHONE_REGEX.test(teacher_phone)) {
    errorsValidation.push({ teacher_phone: 'Phone format is invalid. Expected format: 0XX-XXX-XXXX' });
  }

  if (teacher_email) {
    const exists = await teacherRepository.findOne({ where: { teacher_email } });
    if (exists) {
      errorsValidation.push({ teacher_email: `Teacher with email '${teacher_email}' already exists` });
    }
  }

  if (teacher_phone) {
    const exists = await teacherRepository.findOne({ where: { teacher_phone } });
    if (exists) {
      errorsValidation.push({ teacher_phone: `Teacher with phone '${teacher_phone}' already exists` });
    }
  }

  if (errorsValidation.length !== 0) {
    const customError = new CustomError(400, 'Validation', 'Create teacher validation error', null, null, errorsValidation);
    return next(customError);
  }
  return next();
};

export default validatorCreate;
