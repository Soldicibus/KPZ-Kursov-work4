import { Journal, JournalStatus } from "orm/entities/Journal/Journal";
import { AppDataSource } from "../database/data-source";
import { Students } from "../orm/entities/Students/Students";
import { Timetable } from "orm/entities/Timetable/Timetable";

export class JournalService {
    private journalRepo = AppDataSource.getRepository(Journal)
    private studentRepo = AppDataSource.getRepository(Students);
    private timetableRepo = AppDataSource.getRepository(Timetable);

    async createJournal(data: {
        student_id: number;
        timetable_id: number;
        journal_mark?: number;
        remarks?: string;
        status: JournalStatus;
    }) {
        const { student_id, timetable_id, journal_mark, remarks, status } = data;

        if (!student_id || !timetable_id) {
            throw new Error("Missing required fields: student_id or timetable_id");
        }

        if (!Object.values(JournalStatus).includes(status)) {
            throw new Error("Invalid journal status");
        }

        const studentEntity = await this.studentRepo.findOneBy({ student_id });
        if (!studentEntity) throw new Error(`Student with id ${student_id} not found`);

        const timetableEntity = await this.timetableRepo.findOneBy({ time_id: timetable_id });
        if (!timetableEntity) throw new Error(`Timetable with id ${timetable_id} not found`);

        const journal = this.journalRepo.create({
            journal_Students_id: studentEntity,
            journal_time_id: timetableEntity,
            journal_mark: journal_mark ?? null,
            journal_note: remarks ?? null,
            journal_status: status,
        });

        await this.journalRepo.save(journal);
        return journal;
    }

    async getAllJournals() {
        return await this.journalRepo.find({
            relations: ["journal_Students_id", "journal_time_id"],
        });
    }

    async getJournalById(journalId: number) {
        const journal = await this.journalRepo.findOne({
            where: { journal_id: journalId },
            relations: ["journal_Students_id", "journal_time_id"],
        });
        if (!journal) throw new Error(`Journal with ID ${journalId} not found`);
        return journal;
    }

    async updateJournal(
        journalId: number,
        data: {
            journal_mark?: number;
            remarks?: string;
            status?: JournalStatus;
        }
    ) {
        const journal = await this.journalRepo.findOne({ where: { journal_id: journalId }});
        if (!journal) throw new Error(`Journal with ID ${journalId} not found`);

        if (data.status && !Object.values(JournalStatus).includes(data.status)) {
            throw new Error("Invalid journal status");
        }

        Object.assign(journal, {
            journal_mark: data.journal_mark ?? journal.journal_mark,
            journal_note: data.remarks ?? journal.journal_note,
            journal_status: data.status ?? journal.journal_status,
        });
        await this.journalRepo.save(journal);
        return journal;
    }

    async deleteJournal(journalId: number) {
        const journal = await this.journalRepo.findOne({ where: { journal_id: journalId }});
        if (!journal) throw new Error(`Journal with ID ${journalId} not found`);

        await this.journalRepo.remove(journal);
        return journal;
    }
}
