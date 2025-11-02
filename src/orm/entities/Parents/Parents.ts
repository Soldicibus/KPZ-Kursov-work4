import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, Check } from "typeorm";
import { StudentParent } from "../StudentParent/StudentParent";
import { Students } from "../Students/Students";

@Entity("Parents")
@Check(`"parent_email" ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'`)
@Check(`"parent_phone" ~ '^0[3-9][0-9]-[0-9]{3}-[0-9]{4}$'`)
export class Parents {
  @PrimaryGeneratedColumn()
  parent_id: number;

  @Column({ length: 50, unique: true, nullable: true })
  parent_email: string;

  @Column({ length: 15, unique: true })
  parent_phone: string;

  @Column({ length: 50 })
  parent_name: string;

  @Column({ length: 50 })
  parent_surname: string;

  @Column({ length: 50, nullable: true })
  parent_patronymic: string;

  @OneToMany(() => StudentParent, (sp) => sp.parent)
  studentParents: StudentParent[];

  @ManyToMany(() => Students, (student) => student.parents)
  students: Students[];
}