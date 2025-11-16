import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from "database/data-source";

import { Class } from '../../../orm/entities/Class/Class';
import { Subject } from '../../../orm/entities/Subject/Subject';
import { Teacher } from '../../../orm/entities/Teachers/Teachers';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/;
const DAYS = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', "П'ятниця"];

export const validatorEdit = async (req: Request, res: Response, next: NextFunction) => {
  let { time_day_of_week, time_time, class_name, subject_name, teacher_id } = req.body;
  const errorsValidation: ErrorValidation[] = [];
  const classRepository = AppDataSource.getRepository(Class);
  const subjectRepository = AppDataSource.getRepository(Subject);
  const teacherRepository = AppDataSource.getRepository(Teacher);

  time_day_of_week = time_day_of_week === undefined ? undefined : String(time_day_of_week).trim();
  time_time = time_time === undefined ? undefined : String(time_time).trim();
  class_name = class_name === undefined ? undefined : String(class_name).trim();
  subject_name = subject_name === undefined ? undefined : String(subject_name).trim();

  if (time_day_of_week !== undefined) {
    if (!DAYS.includes(time_day_of_week)) {
      errorsValidation.push({ time_day_of_week: `Day must be one of: ${DAYS.join(', ')}` });
    }
  }

  if (time_time !== undefined) {
    if (!TIME_REGEX.test(time_time)) {
      errorsValidation.push({ time_time: 'Time must be in HH:MM or HH:MM:SS 24-hour format' });
    }
  }

  if (class_name !== undefined) {
    if (class_name === '') {
      errorsValidation.push({ class_name: 'Class name cannot be empty' });
    } else {
      const classEntity = await classRepository.findOne({ where: { class_name } });
      if (!classEntity) errorsValidation.push({ class_name: `Class '${class_name}' not found` });
    }
  }

  if (subject_name !== undefined) {
    if (subject_name === '') {
      errorsValidation.push({ subject_name: 'Subject name cannot be empty' });
    } else {
      const subjectEntity = await subjectRepository.findOne({ where: { subject_name } });
      if (!subjectEntity) errorsValidation.push({ subject_name: `Subject '${subject_name}' not found` });
    }
  }

  if (teacher_id !== undefined) {
    if (teacher_id == null) {
      errorsValidation.push({ teacher_id: 'Teacher id cannot be null' });
    } else {
      const teacherEntity = await teacherRepository.findOne({ where: { teacher_id: Number(teacher_id) } });
      if (!teacherEntity) errorsValidation.push({ teacher_id: `Teacher with id '${teacher_id}' not found` });
    }
  }

  if (errorsValidation.length !== 0) {
    const customError = new CustomError(400, 'Validation', 'Edit timetable validation error', null, null, errorsValidation);
    return next(customError);
  }

  return next();
};

export default validatorEdit;
