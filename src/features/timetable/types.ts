import type { Teacher } from "../teacher/types";
import type { Subject } from "../subject/types";
import type { Class } from "../class/types";

export interface Timetable {
    timetable_id: number;
    class_name: Class["class_name"];
    subject_name: Subject["subject_name"];
    teacher_id: Teacher["teacher_id"];
    day_of_week: string;
    time: string;
}