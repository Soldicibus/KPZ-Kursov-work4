import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Check } from "typeorm";
import { Class } from "../Class/Class";
import { Subject } from "../Subject/Subject";
import { Teacher } from "../Teacher/Teacher";

@Entity("Timetable")
@Check(`"time_Class" ~ '^(?:[1-9]|1[01])-([А-ЩЬЮЯҐЄІЇ]|[а-щьюяґєії])$'`)
@Check(`"time_day_of_week" IN ('Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П''ятниця')`)
export class Timetable {
  @PrimaryGeneratedColumn()
  time_id: number;

  @ManyToOne(() => Class, (cls) => cls.timetables, { onDelete: "CASCADE" })
  time_Class: Class;

  @Column({ length: 10 })
  time_day_of_week: string;

  @Column({ type: "time" })
  time_time: string;

  @ManyToOne(() => Subject, (subject) => subject.timetables, { onDelete: "CASCADE" })
  time_Subject_name: Subject;

  @ManyToOne(() => Teacher, (teacher) => teacher.timetables, { onDelete: "CASCADE" })
  time_Teacher_id: Teacher;
}
