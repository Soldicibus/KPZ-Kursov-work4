import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { Homework } from "../Homework/Homework";
import { Timetable } from "../Timetable/Timetable";

@Entity("Subject")
export class Subject {
  @PrimaryColumn({ length: 30 })
  subject_name: string;

  @Column({ type: "text", unique: true, nullable: true })
  subject_desc: string;

  @OneToMany(() => Homework, (homework) => homework.homework_Subject)
  homeworks: Homework[];

  @OneToMany(() => Timetable, (timetable) => timetable.time_Subject_name)
  timetables: Timetable[];
}
