export interface TeacherClass {
    teacher_id?: number;
    teacher_name?: string;
    teacher_surname?: string;
}

export interface Class {
    class_name: string;
    description?: string;
    teachers?: Array<TeacherClass> | null;
}
