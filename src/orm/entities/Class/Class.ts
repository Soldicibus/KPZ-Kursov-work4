import { Entity, PrimaryColumn, Column, OneToMany, Check } from "typeorm";
import { Students } from "../Students/Students";
import { Homework } from "../Homework/Homework";
import { Timetable } from "../Timetable/Timetable";

@Entity("Class")
@Check(`"class_name" ~ '^(?:[1-9]|1[01])-([А-ЩЬЮЯҐЄІЇ]|[а-щьюяґєії])$'`)
export class Class {
  @PrimaryColumn({ length: 10 })
  class_name: string;

  @Column({ type: "int", unique: true })
  class_Teacher: number;

  @OneToMany(() => Students, (Students) => Students.student_Class)
  Students: Students[];

  @OneToMany(() => Homework, (homework) => homework.homework_Class)
  homeworks: Homework[];

  @OneToMany(() => Timetable, (timetable) => timetable.time_Class)
  timetables: Timetable[];
}
