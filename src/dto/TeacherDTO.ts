import { Teacher } from "../orm/entities/Teachers/Teachers";

export class TeacherDTO {
  teacher_id: number;
  teacher_email: string;
  teacher_phone: string;
  teacher_surname: string;
  teacher_name: string;
  teacher_patronymic: string | null;
  teacher_position: string;
  teacher_class: string | null;
  timetable_ids: number[];

  constructor(t: Teacher) {
    this.teacher_id = t.teacher_id;
    this.teacher_email = t.teacher_email;
    this.teacher_phone = t.teacher_phone;
    this.teacher_surname = t.teacher_surname;
    this.teacher_name = t.teacher_name;
    this.teacher_patronymic = t.teacher_patronymic;
    this.teacher_position = t.teacher_position;
  }
}
