import { AppDataSource } from "../database/data-source";
import { Parents } from "../orm/entities/Parents/Parents";

export class ParentService {
    private parentRepo = AppDataSource.getRepository(Parents);

    async createParent(data: {
        parent_phone: string;
        parent_email?: string;
        parent_name: string;
        parent_surname: string;
        parent_patronymic?: string;
    }) {
        const { parent_phone, parent_email, parent_name, parent_surname, parent_patronymic } = data;

        if (!parent_phone || !parent_name || !parent_surname) {
            throw new Error ("Missing required fields: parent_phone, parent_name, parent_surname")
        }

        const parent = this.parentRepo.create({
            parent_phone,
            parent_email,
            parent_name,
            parent_surname,
            parent_patronymic,
        });

        await this.parentRepo.save(parent);
        return parent;
    }

    async getAllParents() {
        return await this.parentRepo.find({
            relations: ["students"],
        });
    }

    async getParentById(parentId: number) {
        const parent = await this.parentRepo.findOne({
            where: { parent_id: parentId },
            relations: ["students"],
        });
    }

    async updateParent(
        parentId: number,
        data: {
            parent_phone: string;
            parent_email?: string;
            parent_name: string;
            parent_surname: string;
            parent_patronymic?: string;
        }
    )
    {
        const parent = await this.parentRepo.findOne({ where: { parent_id: parentId }});
        if (!parent) throw new Error(`Parent with ID ${parentId} isn't found`);

        Object.assign(parent, data);
        await this.parentRepo.save(parent);
        return parent;
    }

    async deleteParent(parentId: number) {
        const parent = await this.parentRepo.findOne({ where: { parent_id: parentId }});
        if (!parent) throw new Error(`Parent with ID ${parentId} isn't found`);

        await this.parentRepo.remove(parent);
        return { message: "Parent deleted successfully", parentId };
    }
}