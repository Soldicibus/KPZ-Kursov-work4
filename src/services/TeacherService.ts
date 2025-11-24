import { Class } from "../orm/entities/Class/Class";
import { Teacher } from "../orm/entities/Teachers/Teachers";
import { AppDataSource } from "../database/data-source";

export class TeacherService {
    private teacherRepo = AppDataSource.getRepository(Teacher);
    private classRepo = AppDataSource.getRepository(Class);

    async createTeacher(data: {
        teacher_surname: string;
        teacher_name: string;
        teacher_patronymic?: string;
        teacher_phone?: string;
        teacher_email?: string;
        teacher_position?: string;
        teacher_Class: string; // class_name
    }) {
        const { teacher_surname, teacher_name, teacher_patronymic, teacher_phone, teacher_email, teacher_position, teacher_Class } = data;

        if (!teacher_surname || !teacher_name || !teacher_Class || !teacher_email || !teacher_position) {
            throw new Error("Missing required fields: teacher_surname, teacher_name, teacher_Class, teacher_email, or teacher_position");
        }

        const classEntity = await this.classRepo.findOne({ where: { class_name: teacher_Class } });
        if (!classEntity) throw new Error(`Class '${teacher_Class}' not found. Please create it first.`);

        const teacher = this.teacherRepo.create({
            teacher_surname,
            teacher_name,
            teacher_patronymic,
            teacher_phone,
            teacher_email,
            teacher_position,
            teacher_class: classEntity,
        });

        await this.teacherRepo.save(teacher);
        return teacher;
    }

    async getAllTeachers() {
        return await this.teacherRepo.find({
            relations: ["teacher_class"],
        });
    }

    async getTeacherById(teacherId: number) {
        const teacher = await this.teacherRepo.findOne({
            where: { teacher_id: teacherId },
            relations: ["teacher_class"],
        });
        if (!teacher) throw new Error(`Teacher with ID ${teacherId} not found`);
        return teacher;
    }

    async updateTeacher(
        teacherId: number,
        data: {
            teacher_surname?: string;
            teacher_name?: string;
            teacher_patronymic?: string;
            teacher_phone?: string;
            teacher_email?: string;
            teacher_position?: string;
            teacher_Class?: string; // class_name
        }
    ) {
        const teacher = await this.teacherRepo.findOne({ where: { teacher_id: teacherId }});
        if (!teacher) throw new Error(`Teacher with ID ${teacherId} not found`);

        if (data.teacher_Class) {
            const classEntity = await this.classRepo.findOne({ where: { class_name: data.teacher_Class } });
            if (!classEntity) throw new Error(`Class '${data.teacher_Class}' not found. Please create it first.`);
            teacher.teacher_class = classEntity;
            delete data.teacher_Class;
        }

        Object.assign(teacher, data);
        await this.teacherRepo.save(teacher);
        return teacher;
    }

    async deleteTeacher(teacherId: number) {
        const teacher = await this.teacherRepo.findOne({ where: { teacher_id: teacherId }});
        if (!teacher) throw new Error(`Teacher with ID ${teacherId} not found`);

        await this.teacherRepo.remove(teacher);
        return teacher;
    }
}