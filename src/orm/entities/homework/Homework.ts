import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Check } from "typeorm";
import { Subject } from "../Subject/Subject";
import { Class } from "../Class/Class";

@Entity("Homework")
@Check(`"homework_Class" ~ '^(?:[1-9]|1[01])-([А-ЩЬЮЯҐЄІЇ]|[а-щьюяґєії])$'`)
export class Homework {
  @PrimaryGeneratedColumn()
  homework_id: number;

  @ManyToOne(() => Subject, subject => subject.homeworks, { onDelete: "CASCADE" })
  homework_Subject: Subject;

  @Column({ type: "date", default: () => "CURRENT_DATE" })
  homework_created_at: Date;

  @Column({ type: "text", unique: true })
  homework_description: string;

  @Column({ type: "date" })
  homework_duedate: Date;

  @ManyToOne(() => Class, cls => cls.homeworks, { onDelete: "CASCADE" })
  homework_Class: Class;
}
