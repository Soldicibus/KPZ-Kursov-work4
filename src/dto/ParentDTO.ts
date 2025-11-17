// src/dto/ParentResponseDTO.ts
import { Parents } from "../orm/entities/Parents/Parents";

export class ParentResponseDTO {
  id: number;
  name: string;
  surname: string;
  patronymic?: string;
  phone: string;
  email: string;

  constructor(parent: Parents) {
    this.id = parent.parent_id;
    this.name = parent.parent_name;
    this.surname = parent.parent_surname;
    this.patronymic = parent.parent_patronymic;
    this.phone = parent.parent_phone;
    this.email = parent.parent_email;
  }
}
