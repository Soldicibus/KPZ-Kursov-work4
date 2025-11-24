import { Class } from "orm/entities/Class/Class";
import { Timetable } from "../orm/entities/Timetable/Timetable";
import { Subject } from "orm/entities/Subject/Subject";
import { Teacher } from "orm/entities/Teachers/Teachers";

export class TimetableDTO {
  time_id: number;
  time_Class: Class;
  time_day_of_week: string;
  time_time: string;
  time_Subject_name: Subject;
  time_Teacher_id: Teacher;

  constructor(t: Timetable) {
    this.time_id = t.time_id;
    this.time_Class = t.time_Class;
    this.time_day_of_week = t.time_day_of_week;
    this.time_time = t.time_time;
    this.time_Subject_name = t.time_Subject_name;
    this.time_Teacher_id = t.time_Teacher_id;
  }
}
