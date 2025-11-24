import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from 'database/data-source';

import { Timetable } from '../../../orm/entities/Timetable/Timetable';
import { Class } from '../../../orm/entities/Class/Class';
import { Subject } from '../../../orm/entities/Subject/Subject';
import { Teacher } from '../../../orm/entities/Teachers/Teachers';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/;
const DAYS = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', "П'ятниця"];

export const validatorCreate = async (req: Request, res: Response, next: NextFunction) => {
  let { time_day_of_week, time_time, class_name, subject_name, teacher_id } = req.body;
  const errorsValidation: ErrorValidation[] = [];

  // Trim and normalize inputs
  time_day_of_week = typeof time_day_of_week === 'string' ? time_day_of_week.trim() : '';
  time_time = typeof time_time === 'string' ? time_time.trim() : '';
  class_name = typeof class_name === 'string' ? class_name.trim() : '';
  subject_name = typeof subject_name === 'string' ? subject_name.trim() : '';
  teacher_id = teacher_id != null ? Number(teacher_id) : null;

  console.log({
    time_day_of_week,
    time_time,
    class_name,
    subject_name,
    teacher_id
  });


  // Day validation
  if (!time_day_of_week) {
    errorsValidation.push({ time_day_of_week: 'Day of week is required' });
  } else if (!DAYS.includes(time_day_of_week)) {
    errorsValidation.push({ time_day_of_week: `Day must be one of: ${DAYS.join(', ')}` });
  }

  // Time validation
  if (!time_time) {
    errorsValidation.push({ time_time: 'Time is required' });
  } else if (!TIME_REGEX.test(time_time)) {
    errorsValidation.push({ time_time: 'Time must be in HH:MM or HH:MM:SS 24-hour format' });
  }

  const classRepo = AppDataSource.getRepository(Class);
  const subjectRepo = AppDataSource.getRepository(Subject);
  const teacherRepo = AppDataSource.getRepository(Teacher);

  // Class validation
  if (!class_name) {
    errorsValidation.push({ class_name: 'Class name is required' });
  } else {
    const classEntity = await classRepo.findOne({ where: { class_name } });
    if (!classEntity) errorsValidation.push({ class_name: `Class '${class_name}' not found` });
  }

  // Subject validation
  if (!subject_name) {
    errorsValidation.push({ subject_name: 'Subject name is required' });
  } else {
    const subjectEntity = await subjectRepo.findOne({ where: { subject_name } });
    if (!subjectEntity) errorsValidation.push({ subject_name: `Subject '${subject_name}' not found` });
  }

  // Teacher validation
  if (teacher_id == null || isNaN(teacher_id)) {
    errorsValidation.push({ teacher_id: 'Teacher id is required and must be a number' });
  } else {
    const teacherEntity = await teacherRepo.findOne({ where: { teacher_id } });
    if (!teacherEntity) errorsValidation.push({ teacher_id: `Teacher with id '${teacher_id}' not found` });
  }

  // Return all errors if any
  if (errorsValidation.length > 0) {
    const customError = new CustomError(
      400,
      'Validation',
      'Create timetable validation error',
      null,
      null,
      errorsValidation
    );
    return next(customError);
  }

  return next();
};

export default validatorCreate;
