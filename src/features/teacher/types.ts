import type { Class } from "../class/types";

export interface Teacher {
    teacher_id: number;
    teacher_name: string;
    teacher_surname: string;
    teacher_patronymic?: string;
    teacher_email: string;
    teacher_phone?: string;
    teacher_position?: string;
    classes?: Class[];
}

export interface TeacherCreateUpdate {
  teacher_name: string;
  teacher_surname: string;
  teacher_email: string;
  teacher_patronymic?: string;
  teacher_phone?: string;
  teacher_position?: string;
  teacher_Class: string; // class_name
}
