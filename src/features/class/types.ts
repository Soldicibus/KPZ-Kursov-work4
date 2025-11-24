import type { Teacher } from "../teacher/types";

export interface Class {
    class_name: string;
    description?: string;
    teacher?: Teacher | null;
        teacher_name?: string;
        teacher_surname?: string;
}