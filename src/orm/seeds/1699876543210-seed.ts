import { AppDataSource } from "database/data-source";
import { Class } from "orm/entities/Class/Class";
import { Subject } from "orm/entities/Subject/Subject";
import { Teacher } from "orm/entities/Teachers/Teachers";
import { Students } from "orm/entities/Students/Students";
import { Parents } from "orm/entities/Parents/Parents";
import { StudentParent } from "orm/entities/StudentParent/StudentParent";
import { Timetable } from "orm/entities/Timetable/Timetable";
import { Homework } from "orm/entities/Homework/Homework";
import { Journal, JournalStatus } from "orm/entities/Journal/Journal";

async function seed() {
  const ds = await AppDataSource.initialize();

  // Clear everything
  await ds.synchronize(true);

  /* ------------------------------------------
   * 1. CLASS
   * ------------------------------------------ */
  const classesData = ["5-А", "6-Б", "7-В", "8-А", "10-Б"].map((c) =>
    ds.getRepository(Class).create({ class_name: c })
  );

  const classes = await ds.getRepository(Class).save(classesData);

  /* ------------------------------------------
   * 2. SUBJECTS
   * ------------------------------------------ */
  const subjectsData = [
    { subject_name: "Математика", subject_desc: "Алгебра і геометрія" },
    { subject_name: "Українська мова", subject_desc: "Граматика та орфографія" },
    { subject_name: "Англійська мова", subject_desc: "English lessons" },
    { subject_name: "Фізика", subject_desc: "Механіка, оптика" },
    { subject_name: "Хімія", subject_desc: "Органічна та неорганічна" },
  ].map((s) => ds.getRepository(Subject).create(s));

  const subjects = await ds.getRepository(Subject).save(subjectsData);

  /* ------------------------------------------
   * 3. TEACHERS
   * ------------------------------------------ */

  const teacherData = [
    {
      teacher_email: "teach1@example.com",
      teacher_phone: "097-123-4567",
      teacher_surname: "Коваленко",
      teacher_name: "Ірина",
      teacher_patronymic: "Олегівна",
      teacher_position: "Вчитель математики",
      teacher_class: classes[0],
    },
    {
      teacher_email: "teach2@example.com",
      teacher_phone: "093-234-5678",
      teacher_surname: "Сидоренко",
      teacher_name: "Олексій",
      teacher_patronymic: "Ігорович",
      teacher_position: "Вчитель української",
      teacher_class: classes[1],
    },
    {
      teacher_email: "teach3@example.com",
      teacher_phone: "095-345-6789",
      teacher_surname: "Мельник",
      teacher_name: "Анна",
      teacher_patronymic: "Сергіївна",
      teacher_position: "Вчитель англійської",
      teacher_class: classes[2],
    },
    {
      teacher_email: "teach4@example.com",
      teacher_phone: "098-222-3344",
      teacher_surname: "Мазур",
      teacher_name: "Дмитро",
      teacher_patronymic: "Андрійович",
      teacher_position: "Вчитель фізики",
      teacher_class: classes[3],
    },
    {
      teacher_email: "teach5@example.com",
      teacher_phone: "096-555-6677",
      teacher_surname: "Мельничук",
      teacher_name: "Анастасія",
      teacher_patronymic: "Володимирівна",
      teacher_position: "Вчитель хімії",
      teacher_class: classes[4],
    },
  ].map((t) => ds.getRepository(Teacher).create(t));

  const teachers = await ds.getRepository(Teacher).save(teacherData);

  /* ------------------------------------------
   * 4. STUDENTS
   * ------------------------------------------ */

  const studRepo = ds.getRepository(Students);
  const studentsArr = [];

  for (let i = 1; i <= 5; i++) {
    studentsArr.push(
      studRepo.create({
        student_phone: `09${3 + i}-111-22${i}3`,
        student_email: `student${i}@school.com`,
        student_surname: `Прізвище${i}`,
        student_name: `Ім'я${i}`,
        student_patronymic: `По-батькові${i}`,
        student_Class: classes[i - 1],
      })
    );
  }

  const students = await studRepo.save(studentsArr);

  /* ------------------------------------------
   * 5. PARENTS
   * ------------------------------------------ */
  const parentsRepo = ds.getRepository(Parents);
  const parentArr = [];

  for (let i = 1; i <= 5; i++) {
    parentArr.push(
      parentsRepo.create({
        parent_email: `parent${i}@mail.com`,
        parent_phone: `09${5 + i}-555-66${i}7`,
        parent_name: `Батько${i}`,
        parent_surname: `Прізвище${i}`,
        parent_patronymic: `По-батькові${i}`,
      })
    );
  }

  const parents = await parentsRepo.save(parentArr);

  /* ------------------------------------------
   * 6. STUDENT ↔ PARENT
   * ------------------------------------------ */
  const spRepo = ds.getRepository(StudentParent);
  const spArr = [];

  for (let i = 0; i < 5; i++) {
    spArr.push(
      spRepo.create({
        student: students[i],
        parent: parents[i],
        student_id_ref: students[i].student_id,
        parent_id_ref: parents[i].parent_id,
      })
    );
  }

  await spRepo.save(spArr);

  /* ------------------------------------------
   * 7. TIMETABLE
   * ------------------------------------------ */
  const timetableRepo = ds.getRepository(Timetable);
  const ttArr = [];

  const days = ["Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця"];

  for (let i = 0; i < 5; i++) {
    ttArr.push(
      timetableRepo.create({
        time_Class: classes[i],
        time_day_of_week: days[i],
        time_time: `0${8 + i}:00`,
        time_Subject_name: subjects[i],
        time_Teacher_id: teachers[i],
      })
    );
  }

  const timetables = await timetableRepo.save(ttArr);

  /* ------------------------------------------
   * 8. HOMEWORK
   * ------------------------------------------ */
  const hwRepo = ds.getRepository(Homework);

  const hwArr = timetables.map((tt, i) =>
    hwRepo.create({
      homework_description: `Завдання номер ${i + 1}`,
      homework_duedate: new Date(Date.now() + 86400000 * (i + 1)),
      homework_Subject: tt.time_Subject_name,
      homework_Class: tt.time_Class,
    })
  );

  await hwRepo.save(hwArr);

  /* ------------------------------------------
   * 9. JOURNAL
   * ------------------------------------------ */
  const journalRepo = ds.getRepository(Journal);
  const journalArr = [];

  for (let i = 0; i < 5; i++) {
    journalArr.push(
      journalRepo.create({
        journal_Students_id: students[i],
        journal_time_id: timetables[i],
        journal_mark: Math.floor(Math.random() * 12) + 1,
        journal_note: `Примітка ${i + 1}`,
        journal_status: JournalStatus.PRESENT,
      })
    );
  }

  await journalRepo.save(journalArr);

  console.log("✔ Database seeded successfully!");
  await ds.destroy();
}

seed().catch((err) => console.error(err));
export default seed;