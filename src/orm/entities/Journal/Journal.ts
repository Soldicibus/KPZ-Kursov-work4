import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Check } from "typeorm";
import { Timetable } from "../Timetable/Timetable";
import { Students } from "../Students/Students";

export enum JournalStatus {
  PRESENT = "Присутній",
  P = "П",
  ABSENT = "Не присутній",
  N = "Н",
}

@Entity("Journal")
@Check(`"journal_mark" >= 1 AND "journal_mark" <= 12`)
export class Journal {
  @PrimaryGeneratedColumn()
  journal_id: number;

  @ManyToOne(() => Students, (Students) => Students.journals, { onDelete: "CASCADE" })
  @JoinColumn({ name: "journal_students_id" }) // explicitly match DB column
  journal_Students_id: Students;

  @ManyToOne(() => Timetable, { onDelete: "CASCADE" })
  @JoinColumn({ name: "journal_time_id" }) // same here
  journal_time_id: Timetable;

  @Column({ type: "smallint", nullable: true })
  journal_mark: number;

  @Column({ type: "text", nullable: true })
  journal_note: string;

  @Column({ type: "enum", enum: JournalStatus })
  journal_status: JournalStatus;
}
