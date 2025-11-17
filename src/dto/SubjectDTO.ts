// src/dto/SubjectResponseDTO.ts
import { Subject } from "../orm/entities/Subject/Subject";

export class SubjectResponseDTO {
  name: string;
  description?: string;

  constructor(subject: Subject) {
    this.name = subject.subject_name;
    this.description = subject.subject_desc;
  }
}
