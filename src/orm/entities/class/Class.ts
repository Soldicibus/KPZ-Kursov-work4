import { Entity, PrimaryColumn, Column, Check } from "typeorm";

@Entity("Class")
@Check(`"class_name" ~ '^(?:[1-9]|1[01])-([А-ЩЬЮЯҐЄІЇ]|[а-щьюяґєії])$'`)
export class Class {
  @PrimaryColumn({ length: 10 })
  class_name: string;

  @Column({ type: "int", unique: true })
  class_Teacher: number;
}
