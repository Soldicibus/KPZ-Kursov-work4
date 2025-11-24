// src/dto/SubjectResponseDTO.ts
import { Subject } from "../orm/entities/Subject/Subject";

export class SubjectResponseDTO {
  subject_name: string;
  subject_desc?: string;

  constructor(subject: Subject) {
    this.subject_name = subject.subject_name;
    this.subject_desc = subject.subject_desc;
  }
}
