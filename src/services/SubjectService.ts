import { AppDataSource } from "database/data-source";
import { Subject } from "../orm/entities/Subject/Subject";

export class SubjectService{
    private subjectRepo = AppDataSource.getRepository(Subject);

    async createSubject(data: {
        subject_name: string;
        subject_desc?: string;
    }) {
        const { subject_name, subject_desc } = data;

        if (!subject_name) {
            throw new Error("Missing required field: subject_name");
        }

        const subjectEntity = this.subjectRepo.create({
            subject_name,
            subject_desc,
        });

        await this.subjectRepo.save(subjectEntity);
        return subjectEntity;
    }

    async getAllSubjects() {
        return await this.subjectRepo.find();
    }

    async getSubjectById(subjectName: string) {
        const subjectEntity = await this.subjectRepo.findOne({ 
            where: { subject_name : subjectName }, 
        });
        if (!subjectEntity) throw new Error(`Subject with name ${subjectName} not found`);
        return subjectEntity;
    }

    async updateSubject(
        subjectName: string,
        data: {
            subject_name?: string;
            subject_desc?: string;
        }
    ) {
        const subjectEntity = await this.subjectRepo.findOne({ where: { subject_name: subjectName }});
        if (!subjectEntity) throw new Error(`Subject with name ${subjectName} not found`);

        Object.assign(subjectEntity, data);
        await this.subjectRepo.save(subjectEntity);
        return subjectEntity;
    }

    async deleteSubject(subjectName: string) {
        const subjectEntity = await this.subjectRepo.findOne({ where: { subject_name: subjectName }});
        if (!subjectEntity) throw new Error(`Subject with name ${subjectName} not found`);
        await this.subjectRepo.remove(subjectEntity);
        return subjectEntity;
    }
}