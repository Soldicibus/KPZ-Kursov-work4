import { AppDataSource } from "../database/data-source";
import { Class } from "../orm/entities/Class/Class";

export class ClassService {
    private classRepo = AppDataSource.getRepository(Class);

    async createClass(data: {
        class_name: string;
    }) {
        const { class_name } = data;

        if (!class_name) {
            throw new Error("Missing required field: class_name");
        }

        const classEntity = this.classRepo.create({
            class_name,
        });

        await this.classRepo.save(classEntity);
        return classEntity;
    }

    async getAllClasses() {
        return await this.classRepo.find({ relations: { class_Teacher: true } });
    }

    async getClassById(className: string) {
        const classEntity = await this.classRepo.findOne({ 
            where: { class_name : className }, 
            relations: { class_Teacher: true },
        });
        if (!classEntity) throw new Error(`Class with name ${className} not found`);
        return classEntity;
    }

    async updateClass(
        className: string,
        data: {
            class_name?: string;
        }
    ) {
        const classEntity = await this.classRepo.findOne({ where: { class_name: className }, relations: { class_Teacher: true }});
        if (!classEntity) throw new Error(`Class with name ${className} not found`);

        Object.assign(classEntity, data);
        await this.classRepo.save(classEntity);
        return classEntity;
    }

    async deleteClass(className: string) {
        const classEntity = await this.classRepo.findOne({ where: { class_name: className }, relations: { class_Teacher: true }});
        if (!classEntity) throw new Error(`Class with name ${className} not found`);

        await this.classRepo.remove(classEntity);
        return classEntity;
    }
}