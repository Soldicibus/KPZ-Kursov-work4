import { Entity, PrimaryGeneratedColumn, Column, Check, OneToMany } from "typeorm";
import { Timetable } from "../Timetable/Timetable";

@Entity("Teacher")
@Check(`"teacher_email" ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'`)
@Check(`"teacher_phone" ~ '^0[3-9]\\d{1}-\\d{3}-\\d{4}$'`)
export class Teacher {
  @PrimaryGeneratedColumn()
  teacher_id: number;

  @Column({ length: 50, unique: true })
  teacher_email: string;

  @Column({ length: 15, unique: true })
  teacher_phone: string;

  @Column({ length: 50 })
  teacher_surname: string;

  @Column({ length: 50 })
  teacher_name: string;

  @Column({ length: 50, nullable: true })
  teacher_patronymic: string;

  @Column({ length: 50 })
  teacher_position: string;

  @OneToMany(() => Timetable, (timetable) => timetable.time_Teacher_id)
  timetables: Timetable[];
}
