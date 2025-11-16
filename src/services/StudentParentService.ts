import {  StudentParent } from "../orm/entities/StudentParent/StudentParent";
import { Students } from "../orm/entities/Students/Students";
import { Parents } from "../orm/entities/Parents/Parents";
import { AppDataSource } from "../database/data-source";

export class StudentParentService {
    private studentParentRepo = AppDataSource.getRepository(StudentParent);
    private studentRepo = AppDataSource.getRepository(Students);
    private parentRepo = AppDataSource.getRepository(Parents);

    async createStudentParent(data: {
        student_id: number;
        parent_id: number;
    }) {
        const { student_id, parent_id } = data;

        if (!student_id || !parent_id) {
            throw new Error("Missing required fields: student_id or parent_id");
        }

        const studentEntity = await this.studentRepo.findOneBy({ student_id: student_id });
        if (!studentEntity) throw new Error(`Student with id ${student_id} not found`);

        const parentEntity = await this.parentRepo.findOneBy({ parent_id: parent_id });
        if (!parentEntity) throw new Error(`Parent with id ${parent_id} not found`);

        const studentParentEntity = this.studentParentRepo.create({
            student: studentEntity,
            parent: parentEntity,
        });

        await this.studentParentRepo.save(studentParentEntity);
        return studentParentEntity;
    }

    async deleteStudentParent(studentId: number, parentId: number) {
        const studentParentEntity = await this.studentParentRepo.findOne({ where: { student_id_ref: studentId, parent_id_ref: parentId }});
        if (!studentParentEntity) throw new Error(`StudentParent relationship with student_id ${studentId} and parent_id ${parentId} not found`);

        await this.studentParentRepo.remove(studentParentEntity);
        return studentParentEntity;
    }
}