import { Students } from "../orm/entities/Students/Students";

export class StudentResponseDTO {
  id: number;
  surname: string;
  name: string;
  patronymic?: string;
  email?: string;
  phone?: string;
  className: string;

  constructor(student: Students) {
    this.id = student.student_id;
    this.surname = student.student_surname;
    this.name = student.student_name;
    this.patronymic = student.student_patronymic;
    this.email = student.student_email;
    this.phone = student.student_phone;
    this.className = student.student_Class?.class_name ?? null;
  }
}
