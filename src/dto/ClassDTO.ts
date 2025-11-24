import { Class } from "../orm/entities/Class/Class";

export class ClassDTO {
  class_name: string;
  teacher: { teacher_id: number; teacher_name: string; teacher_surname: string } | null;

  constructor(cls: Class) {
    this.class_name = cls.class_name;

    const head = cls.class_Teacher && cls.class_Teacher.length > 0 ? cls.class_Teacher[0] : null;
    this.teacher = head
      ? { teacher_id: head.teacher_id, teacher_name: head.teacher_name, teacher_surname: head.teacher_surname }
      : null;
  }
}
