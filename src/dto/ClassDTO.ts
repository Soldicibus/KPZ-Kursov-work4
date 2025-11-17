import { Class } from "../orm/entities/Class/Class";

export class ClassDTO {
  class_name: string;
  teacher_ids: number[];

  constructor(cls: Class) {
    this.class_name = cls.class_name;

    this.teacher_ids = cls.class_Teacher?.map(t => t.teacher_id) ?? [];
  }
}
