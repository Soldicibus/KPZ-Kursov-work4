import { Journal } from "../orm/entities/Journal/Journal";

export class JournalDTO {
  journal_id: number;
  journal_Students_id: number;
  journal_time_id: number;
  journal_mark: number | null;
  journal_note: string | null;
  journal_status: string;

  constructor(j: Journal) {
    this.journal_id = j.journal_id;
    this.journal_Students_id = j.journal_Students_id.student_id;
    this.journal_time_id = j.journal_time_id.time_id;
    this.journal_mark = j.journal_mark;
    this.journal_note = j.journal_note;
    this.journal_status = j.journal_status;
  }
}
