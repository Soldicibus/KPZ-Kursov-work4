import { Homework } from "../orm/entities/Homework/Homework";
import { Subject } from "../orm/entities/Subject/Subject";
import { Class } from "../orm/entities/Class/Class";
import { AppDataSource } from "../database/data-source";

export class HomeworkService {
    private homeworkRepo = AppDataSource.getRepository(Homework);
    private subjectRepo = AppDataSource.getRepository(Subject);
    private classRepo = AppDataSource.getRepository(Class);

    async createHomework(data: {
        homework_description: string;
        homework_duedate: Date;
        homework_subject: string; // subject_name
        homework_class: string; // class_name
    })
    {
        const { homework_description, homework_duedate, homework_subject, homework_class } = data;
        
        if (!homework_description || !homework_duedate || !homework_subject || !homework_class) {
            throw new Error("Missing required fields: homework_description, homework_duedate, homework_subject, or homework_class");
        }
        const subjectEntity = await this.subjectRepo.findOne({ where: { subject_name: homework_subject } });
        if (!subjectEntity) throw new Error(`Subject '${homework_subject}' not found. Please create it first.`);
        
        const classEntity = await this.classRepo.findOne({ where: { class_name: homework_class } });
        if (!classEntity) throw new Error(`Class '${homework_class}' not found. Please create it first.`);
        const homeworkEntity = this.homeworkRepo.create({
            homework_description,
            homework_duedate,
            homework_Subject: subjectEntity,
            homework_Class: classEntity,
        });
        
        await this.homeworkRepo.save(homeworkEntity);
        return homeworkEntity;
    }
    async getAllHomeworks() {
        return await this.homeworkRepo.find({
            relations: ["homework_subject", "homework_class"],
        });
    }
    async getHomeworkById(homeworkId: number) {
        const homeworkEntity = await this.homeworkRepo.findOne({
            where: { homework_id: homeworkId },
            relations: ["homework_subject", "homework_class"],
        });
        if (!homeworkEntity) throw new Error(`Homework with ID ${homeworkId} not found`);
        return homeworkEntity;
    }
    async updateHomework(
        homeworkId: number,
        data: {
            homework_description?: string;
            homework_due_date?: Date;
            homework_subject?: string; // subject_name
            homework_class?: string; // class_name
        }
    ) {
        const homeworkEntity = await this.homeworkRepo.findOne({ where: { homework_id: homeworkId }});
        if (!homeworkEntity) throw new Error(`Homework with ID ${homeworkId} not found`);

        if (data.homework_subject) {
            const subjectEntity = await this.subjectRepo.findOne({ where: { subject_name: data.homework_subject } });
            if (!subjectEntity) throw new Error(`Subject '${data.homework_subject}' not found. Please create it first.`);
            homeworkEntity.homework_Subject = subjectEntity;
        }

        if (data.homework_class) {
            const classEntity = await this.classRepo.findOne({ where: { class_name: data.homework_class } });
            if (!classEntity) throw new Error(`Class '${data.homework_class}' not found. Please create it first.`);
            homeworkEntity.homework_Class = classEntity;
        }

        Object.assign(homeworkEntity, data);
        await this.homeworkRepo.save(homeworkEntity);
        return homeworkEntity;
    }

    async deleteHomework(homeworkId: number) {
        const homeworkEntity = await this.homeworkRepo.findOne({ where: { homework_id: homeworkId }});
        if (!homeworkEntity) throw new Error(`Homework with ID ${homeworkId} not found`);
        await this.homeworkRepo.remove(homeworkEntity);
        return homeworkEntity;
    }
}