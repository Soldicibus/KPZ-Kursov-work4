import { Timetable } from "../orm/entities/Timetable/Timetable";
import { AppDataSource } from "../database/data-source";
import { Class } from "../orm/entities/Class/Class";
import { Subject } from "../orm/entities/Subject/Subject";
import { Teacher } from "../orm/entities/Teachers/Teachers";

export class TimetableService {
    private timetableRepo = AppDataSource.getRepository(Timetable);
    private classRepo = AppDataSource.getRepository(Class);
    private subjectRepo = AppDataSource.getRepository(Subject);
    private teacherRepo = AppDataSource.getRepository(Teacher);

    async createTimetableEntry(data: {
        time_day_of_week: string;
        time_time: string;
        class_name: string;
        subject_name: string;
        teacher_id: number;
    }) {
        const { time_day_of_week, time_time, class_name, subject_name, teacher_id } = data;

        if (!time_day_of_week || !time_time || !class_name || !subject_name || teacher_id == null) {
            throw new Error("Missing required fields: time_day_of_week, time_time, class_name, subject_name, or teacher_id");
        }

        const classEntity = await this.classRepo.findOne({ where: { class_name: class_name } });
        if (!classEntity) throw new Error(`Class '${class_name}' not found. Please create it first.`);

        const subjectEntity = await this.subjectRepo.findOne({ where: { subject_name: subject_name } });
        if (!subjectEntity) throw new Error(`Subject '${subject_name}' not found. Please create it first.`);

        const teacherEntity = await this.teacherRepo.findOne({ where: { teacher_id: teacher_id } });
        if (!teacherEntity) throw new Error(`Teacher with ID '${teacher_id}' not found. Please create it first.`);

        const timetableEntry = this.timetableRepo.create({
            time_day_of_week,
            time_time,
            time_Class: classEntity,
            time_Subject_name: subjectEntity,
            time_Teacher_id: teacherEntity,
        });

        await this.timetableRepo.save(timetableEntry);
        return timetableEntry;
    }
    async getAllTimetableEntries() {
        return await this.timetableRepo.find({
            relations: ["time_Class", "time_Subject_name", "time_Teacher_id"],
        });
    }
    async getTimetableEntryById(timetableId: number) {
        const timetableEntry = await this.timetableRepo.findOne({
            where: { time_id: timetableId },
            relations: ["time_Class", "time_Subject_name", "time_Teacher_id"],
        });
        if (!timetableEntry) throw new Error(`Timetable entry with ID ${timetableId} not found`);
        return timetableEntry;
    }
    async updateTimetableEntry(
        timetableId: number,
        data: {
            time_day_of_week?: string;
            time_time?: string;
            class_name?: string; // class_name
            subject_name?: string; // subject_name
            teacher_id?: number; // teacher_id
        }
    ) {
        const timetableEntry = await this.timetableRepo.findOne({ where: { time_id: timetableId }});
        if (!timetableEntry) throw new Error(`Timetable entry with ID ${timetableId} not found`);

        if (data.class_name) {
            const classEntity = await this.classRepo.findOne({ where: { class_name: data.class_name } });
            if (!classEntity) throw new Error(`Class '${data.class_name}' not found. Please create it first.`);
            timetableEntry.time_Class = classEntity;
        }

        if (data.subject_name) {
            const subjectEntity = await this.subjectRepo.findOne({
                where: { subject_name: data.subject_name },
            });
            if (!subjectEntity) throw new Error(`Subject '${data.subject_name}' not found. Please create it first.`);
            timetableEntry.time_Subject_name = subjectEntity;
        }

        if (data.teacher_id != null) {
            const teacherEntity = await this.teacherRepo.findOne({ where: { teacher_id: data.teacher_id } });
            if (!teacherEntity) throw new Error(`Teacher with ID '${data.teacher_id}' not found. Please create it first.`);
            timetableEntry.time_Teacher_id = teacherEntity;
        }

        if (data.time_day_of_week !== undefined) {
            timetableEntry.time_day_of_week = data.time_day_of_week;
        }
        if (data.time_time !== undefined) {
            timetableEntry.time_time = data.time_time;
        }
        
        await this.timetableRepo.save(timetableEntry);
        return timetableEntry;
    }
    async deleteTimetableEntry(timetableId: number) {
        const timetableEntry = await this.timetableRepo.findOne({ where: { time_id: timetableId }});
        if (!timetableEntry) throw new Error(`Timetable entry with ID ${timetableId} not found`);

        await this.timetableRepo.remove(timetableEntry);
        return timetableEntry;
    }
}