import type { Teacher } from "../teacher/types";
import type { Subject } from "../subject/types";
import type { Class } from "../class/types";

export interface Timetable {
    time_id: number;
    time_day_of_week: string;
    time_time: string;

    time_Class: {
        class_name: string;
    };

    time_Subject_name: {
        subject_name: string;
        subject_desc: string;
    };

    time_Teacher_id: {
        teacher_id: number;
        teacher_email: string;
        teacher_phone: string;
        teacher_surname: string;
        teacher_name: string;
        teacher_patronymic: string;
        teacher_position: string;
    };
}


export interface TimetableInput {
    class_name: Class["class_name"];
    subject_name: Subject["subject_name"];
    teacher_id: Teacher["teacher_id"];
    time_day_of_week: string;
    time_time: string;
}