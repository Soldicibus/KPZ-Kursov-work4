import { z } from "zod";

const DAYS = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', "П'ятниця"] as const;

export const timetableSchema = z.object({
  time_day_of_week: z.enum(DAYS, {
    message: `Day must be one of: ${DAYS.join(', ')}`
  }),
  time_time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/, {
    message: 'Time must be in HH:MM or HH:MM:SS 24-hour format'
  }),
  class_name: z.string().min(1, { message: 'Class name is required' }),
  subject_name: z.string().min(1, { message: 'Subject name is required' }),
  teacher_id: z.number().int().positive({ message: 'Teacher ID must be a positive integer' }),
});
