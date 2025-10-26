import { Entity, ManyToOne, PrimaryColumn, JoinColumn } from "typeorm";
import { Students } from "../Students/Students";
import { Parents } from "../Parents/Parents";

@Entity("StudentParent")
export class StudentParent {
  @PrimaryColumn()
  student_id_ref: number;

  @PrimaryColumn()
  parent_id_ref: number;

  @ManyToOne(() => Students, (student) => student.studentParents, { onDelete: "CASCADE" })
  @JoinColumn({ name: "student_id_ref" })
  student: Students;

  @ManyToOne(() => Parents, (parent) => parent.studentParents, { onDelete: "CASCADE" })
  @JoinColumn({ name: "parent_id_ref" })
  parent: Parents;
}
