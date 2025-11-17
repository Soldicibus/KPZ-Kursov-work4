import { Homework } from "../orm/entities/Homework/Homework";

export class HomeworkDTO {
  homework_id: number;
  homework_Subject: string;
  homework_created_at: Date;
  homework_description: string;
  homework_duedate: Date;
  homework_Class: string;

  constructor(h: Homework) {
    this.homework_id = h.homework_id;
    this.homework_Subject = h.homework_Subject.subject_name;
    this.homework_created_at = h.homework_created_at;
    this.homework_description = h.homework_description;
    this.homework_duedate = h.homework_duedate;
    this.homework_Class = h.homework_Class.class_name;
  }
}
