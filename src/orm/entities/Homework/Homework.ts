import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Check, JoinColumn } from "typeorm";
import { Subject } from "../Subject/Subject";
import { Class } from "../Class/Class";

@Entity("Homework")
@Check(`"homework_Class" ~ '^(?:[1-9]|1[01])-([А-ЩЬЮЯҐЄІЇ]|[а-щьюяґєії])$'`)
export class Homework {
  @PrimaryGeneratedColumn()
  homework_id: number;

  @ManyToOne(() => Subject, subject => subject.homeworks, { onDelete: "CASCADE" })
  @JoinColumn({ name: "homework_subject_subject_name" }) // explicitly match DB column
  homework_Subject: Subject;

  @Column({ type: "date", default: () => "CURRENT_DATE" })
  homework_created_at: Date;

  @Column({ type: "text", unique: true })
  homework_description: string;

  @Column({ type: "date" })
  homework_duedate: Date;

  @ManyToOne(() => Class, cls => cls.homeworks, { onDelete: "CASCADE" })
  @JoinColumn({ name: "homework_class_class_name" }) // explicitly match DB column
  homework_Class: Class;
}
