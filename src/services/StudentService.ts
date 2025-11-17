import { AppDataSource } from "../database/data-source";
import { Students } from "../orm/entities/Students/Students";
import { Class } from "../orm/entities/Class/Class";

export class StudentService {
  private studentRepo = AppDataSource.getRepository(Students);
  private classRepo = AppDataSource.getRepository(Class);

  async createStudent(data: {
    student_phone?: string;
    student_email?: string;
    student_surname: string;
    student_name: string;
    student_patronymic?: string;
    student_Class: string; // class_name
  }) {
    const { student_phone, student_email, student_surname, student_name, student_patronymic, student_Class } = data;

    if (!student_surname || !student_name || !student_Class) {
      throw new Error("Missing required fields: student_surname, student_name, or student_Class");
    }

    const classEntity = await this.classRepo.findOne({ where: { class_name: student_Class } });
    if (!classEntity) throw new Error(`Class '${student_Class}' not found. Please create it first.`);

    const student = this.studentRepo.create({
      student_phone,
      student_email,
      student_surname,
      student_name,
      student_patronymic,
      student_Class: classEntity,
    });

    await this.studentRepo.save(student);
    return student;
  }

  async getAllStudents() {
    return await this.studentRepo.find({
      relations: ["student_Class"],
    });
  }

  async getStudentById(studentId: number) {
    const student = await this.studentRepo.findOne({
      where: { student_id: studentId },
      relations: ["student_Class"],
    });
    if (!student) throw new Error(`Student with ID ${studentId} not found`);
    return student;
  }

  async updateStudent(
    studentId: number,
    data: {
      student_phone?: string;
      student_email?: string;
      student_surname?: string;
      student_name?: string;
      student_patronymic?: string;
      student_Class?: string;
    }
  ) {
    const student = await this.studentRepo.findOne({ where: { student_id: studentId } });
    if (!student) throw new Error(`Student with ID ${studentId} not found`);

    if (data.student_Class) {
      const classEntity = await this.classRepo.findOne({ where: { class_name: data.student_Class } });
      if (!classEntity) throw new Error(`Class '${data.student_Class}' not found`);
      student.student_Class = classEntity;
    }

    Object.assign(student, data);
    await this.studentRepo.save(student);
    return student;
  }

  async deleteStudent(studentId: number) {
    const student = await this.studentRepo.findOne({ where: { student_id: studentId } });
    if (!student) throw new Error(`Student with ID ${studentId} not found`);

    await this.studentRepo.remove(student);
    return { message: "Student deleted successfully", studentId };
  }
}
