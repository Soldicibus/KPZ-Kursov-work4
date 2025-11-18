import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Check, JoinColumn } from "typeorm";
import { Class } from "../Class/Class";
import { Subject } from "../Subject/Subject";
import { Teacher } from "../Teachers/Teachers";

@Entity("Timetable")
@Check(`"time_Class" ~ '^(?:[1-9]|1[01])-([А-ЩЬЮЯҐЄІЇ]|[а-щьюяґєії])$'`)
@Check(`"time_day_of_week" IN ('Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П''ятниця')`)
export class Timetable {
  @PrimaryGeneratedColumn()
  time_id: number;

  @ManyToOne(() => Class, (cls) => cls.timetables, { onDelete: "CASCADE" })
  @JoinColumn({ name: "time_class_class_name" }) // explicitly match DB column
  time_Class: Class;

  @Column({ length: 10 })
  time_day_of_week: string;

  @Column({ type: "time" })
  time_time: string;

  @ManyToOne(() => Subject, (subject) => subject.timetables, { onDelete: "CASCADE" })
  @JoinColumn({ name: "time_subject_name_subject_name" }) // explicitly match DB column
  time_Subject_name: Subject;

  @ManyToOne(() => Teacher, (teacher) => teacher.timetables, { onDelete: "CASCADE" })
  @JoinColumn({ name: "time_teacher_id_teacher_id" }) // explicitly match DB column
  time_Teacher_id: Teacher;
}
