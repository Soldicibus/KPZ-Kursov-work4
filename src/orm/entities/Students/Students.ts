import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToOne, ManyToMany, OneToMany, Check } from "typeorm";
import { Class } from "../Class/Class";
import { Journal } from "../Journal/Journal";
import { StudentParent } from "../StudentParent/StudentParent";
import { Parents } from "../Parents/Parents"

@Entity("Students")
@Check(`"student_phone" ~ '^0[3-9]\\d{1}-\\d{3}-\\d{4}$'`)
@Check(`"student_email" ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'`)
export class Students {
  @PrimaryGeneratedColumn()
  student_id: number;

  @Column({ length: 15, unique: true, nullable: true })
  student_phone: string;

  @Column({ length: 50, unique: true, nullable: true })
  student_email: string;

  @Column({ length: 50 })
  student_surname: string;

  @Column({ length: 50 })
  student_name: string;

  @Column({ length: 50, nullable: true })
  student_patronymic: string;

  @ManyToOne(() => Class, (cls) => cls.Students, { onDelete: "CASCADE" })
  student_Class: Class;

  @OneToMany(() => Journal, (journal) => journal.journal_Students_id)
  journals: Journal[];

  @OneToMany(() => StudentParent, (sp) => sp.student)
  studentParents: StudentParent[];

  @ManyToMany(() => Parents, (parent) => parent.students)
  @JoinTable({
    name: "StudentParent",
    joinColumn: { name: "student_id_ref", referencedColumnName: "student_id" },
    inverseJoinColumn: { name: "parent_id_ref", referencedColumnName: "parent_id" },
  })
  parents: Parents[];

}
