import { Timetable } from "../orm/entities/Timetable/Timetable";

export class TimetableDTO {
  time_id: number;
  time_Class: string;
  time_day_of_week: string;
  time_time: string;
  time_Subject_name: string;
  time_Teacher_id: number;

  constructor(t: Timetable) {
    this.time_id = t.time_id;
    this.time_Class = t.time_Class.class_name;
    this.time_day_of_week = t.time_day_of_week;
    this.time_time = t.time_time;
    this.time_Subject_name = t.time_Subject_name.subject_name;
    this.time_Teacher_id = t.time_Teacher_id.teacher_id;
  }
}
