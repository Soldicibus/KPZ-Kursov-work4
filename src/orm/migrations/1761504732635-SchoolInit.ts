import {MigrationInterface, QueryRunner} from "typeorm";

export class SchoolInit1761504732635 implements MigrationInterface {
    name = 'SchoolInit1761504732635'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "Homework" (
                "homework_id" SERIAL NOT NULL,
                "homework_created_at" date NOT NULL DEFAULT ('now'::text)::date,
                "homework_description" text NOT NULL,
                "homework_duedate" date NOT NULL,
                "homework_subject_subject_name" character varying(30),
                "homework_class_class_name" character varying(10),
                CONSTRAINT "UQ_61a3d38da341f7d63ae1064ba2a" UNIQUE ("homework_description"),
                CONSTRAINT "CHK_6b6d5a6b59202c30ccf5f5d560" CHECK (
                    "homework_class_class_name" ~ '^(?:[1-9]|1[01])-([А-ЩЬЮЯҐЄІЇ]|[а-щьюяґєії])$'
                ),
                CONSTRAINT "PK_bc2fcef8cf122336df9dd59d502" PRIMARY KEY ("homework_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "Subject" (
                "subject_name" character varying(30) NOT NULL,
                "subject_desc" text,
                CONSTRAINT "UQ_5af032db9941cbf0e439d1e6a51" UNIQUE ("subject_desc"),
                CONSTRAINT "PK_cd158cf85b5705d8d19ccb51e26" PRIMARY KEY ("subject_name")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "Teacher" (
                "teacher_id" SERIAL NOT NULL,
                "teacher_email" character varying(50) NOT NULL,
                "teacher_phone" character varying(15) NOT NULL,
                "teacher_surname" character varying(50) NOT NULL,
                "teacher_name" character varying(50) NOT NULL,
                "teacher_patronymic" character varying(50),
                "teacher_position" character varying(50) NOT NULL,
                CONSTRAINT "UQ_c55b74fe84ba9ca4f0b1e9b45ec" UNIQUE ("teacher_email"),
                CONSTRAINT "UQ_b0aacb6b6f2d5f343fbdf9b2d63" UNIQUE ("teacher_phone"),
                CONSTRAINT "CHK_b841c4c8a8912abb1e673fd427" CHECK ("teacher_phone" ~ '^0[3-9]\d{1}-\d{3}-\d{4}$'),
                CONSTRAINT "CHK_ec36dcaba23bcdf45701ee998e" CHECK (
                    "teacher_email" ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
                ),
                CONSTRAINT "PK_30ff35033d48ee4b4f73ae563f5" PRIMARY KEY ("teacher_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "Timetable" (
                "time_id" SERIAL NOT NULL,
                "time_day_of_week" character varying(10) NOT NULL,
                "time_time" TIME NOT NULL,
                "time_class_class_name" character varying(10),
                "time_subject_name_subject_name" character varying(30),
                "time_teacher_id_teacher_id" integer,
                CONSTRAINT "CHK_0e69de8f1ad60ca0d10f4efca1" CHECK (
                    "time_day_of_week" IN (
                        'Понеділок',
                        'Вівторок',
                        'Середа',
                        'Четвер',
                        'П''ятниця'
                    )
                ),
                CONSTRAINT "CHK_7be2b0c0377cd2237758007d2c" CHECK (
                    "time_class_class_name" ~ '^(?:[1-9]|1[01])-([А-ЩЬЮЯҐЄІЇ]|[а-щьюяґєії])$'
                ),
                CONSTRAINT "PK_5200276a61fb1b96c103be81216" PRIMARY KEY ("time_id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."Journal_journal_status_enum" AS ENUM('Присутній', 'П', 'Не присутній', 'Н')
        `);
        await queryRunner.query(`
            CREATE TABLE "Journal" (
                "journal_id" SERIAL NOT NULL,
                "journal_mark" smallint,
                "journal_note" text,
                "journal_status" "public"."Journal_journal_status_enum" NOT NULL,
                "journal_students_id_student_id" integer,
                "journal_time_id_time_id" integer,
                CONSTRAINT "CHK_bd315b57a83d85ae2896cd1912" CHECK (
                    "journal_mark" >= 1
                    AND "journal_mark" <= 12
                ),
                CONSTRAINT "PK_f1ab130403a4624e1d30416b4f1" PRIMARY KEY ("journal_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "Parents" (
                "parent_id" SERIAL NOT NULL,
                "parent_email" character varying(50),
                "parent_phone" character varying(15) NOT NULL,
                "parent_name" character varying(50) NOT NULL,
                "parent_surname" character varying(50) NOT NULL,
                "parent_patronymic" character varying(50),
                CONSTRAINT "UQ_b18832ed54315a303dde1e65359" UNIQUE ("parent_email"),
                CONSTRAINT "UQ_7c5b679cb9756c2e7764f988ee7" UNIQUE ("parent_phone"),
                CONSTRAINT "CHK_54e53b02fc90ba4d5f2ba685f3" CHECK ("parent_phone" ~ '^0[3-9]\d{1}-\d{3}-\d{4}$'),
                CONSTRAINT "CHK_ef113669efbaa89f90ac648e0e" CHECK (
                    "parent_email" ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
                ),
                CONSTRAINT "PK_0034b03820627dbf8b43ea91a36" PRIMARY KEY ("parent_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "StudentParent" (
                "student_id_ref" integer NOT NULL,
                "parent_id_ref" integer NOT NULL,
                CONSTRAINT "PK_aabd90f699787fac85ec2778186" PRIMARY KEY ("student_id_ref", "parent_id_ref")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "Students" (
                "student_id" SERIAL NOT NULL,
                "student_phone" character varying(15),
                "student_email" character varying(50),
                "student_surname" character varying(50) NOT NULL,
                "student_name" character varying(50) NOT NULL,
                "student_patronymic" character varying(50),
                "student_class_class_name" character varying(10),
                CONSTRAINT "UQ_98bfdde84b41747638710744f7c" UNIQUE ("student_phone"),
                CONSTRAINT "UQ_905eac317aaa79427e48fe75967" UNIQUE ("student_email"),
                CONSTRAINT "CHK_6245f886b738dc8730add633c9" CHECK (
                    "student_email" ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
                ),
                CONSTRAINT "CHK_6b49691b7a921a8d2c6570f866" CHECK ("student_phone" ~ '^0[3-9]\d{1}-\d{3}-\d{4}$'),
                CONSTRAINT "PK_5b41b3256a417a62525603a96cc" PRIMARY KEY ("student_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "Class" (
                "class_name" character varying(10) NOT NULL,
                "class_teacher" integer NOT NULL,
                CONSTRAINT "UQ_9bcecb616dd208f14ed2798ed82" UNIQUE ("class_teacher"),
                CONSTRAINT "CHK_d0a0fb11933476fa274d0d4173" CHECK (
                    "class_name" ~ '^(?:[1-9]|1[01])-([А-ЩЬЮЯҐЄІЇ]|[а-щьюяґєії])$'
                ),
                CONSTRAINT "PK_d11bc764469f092aa1755859cf2" PRIMARY KEY ("class_name")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_e8e2b04c3d7c255bca7754ae53" ON "StudentParent" ("student_id_ref")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_0c01a1c2b7d68e60c370bfb0ba" ON "StudentParent" ("parent_id_ref")
        `);
        await queryRunner.query(`
            ALTER TABLE "Homework"
            ADD CONSTRAINT "FK_e05f26b490658570f942eccf82b" FOREIGN KEY ("homework_subject_subject_name") REFERENCES "Subject"("subject_name") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "Homework"
            ADD CONSTRAINT "FK_4483bc37d934bb3d30554d570f1" FOREIGN KEY ("homework_class_class_name") REFERENCES "Class"("class_name") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "Timetable"
            ADD CONSTRAINT "FK_9898ba104d570a10c2ec4851237" FOREIGN KEY ("time_class_class_name") REFERENCES "Class"("class_name") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "Timetable"
            ADD CONSTRAINT "FK_b0dc30aeedf754f88c0dda55501" FOREIGN KEY ("time_subject_name_subject_name") REFERENCES "Subject"("subject_name") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "Timetable"
            ADD CONSTRAINT "FK_99df6e09a12c083be13a3f7cbf4" FOREIGN KEY ("time_teacher_id_teacher_id") REFERENCES "Teacher"("teacher_id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "Journal"
            ADD CONSTRAINT "FK_9f846ca43a001c7b9a45eeacea7" FOREIGN KEY ("journal_students_id_student_id") REFERENCES "Students"("student_id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "Journal"
            ADD CONSTRAINT "FK_1505c47443cbc4730e0948a854e" FOREIGN KEY ("journal_time_id_time_id") REFERENCES "Timetable"("time_id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "StudentParent"
            ADD CONSTRAINT "FK_e8e2b04c3d7c255bca7754ae530" FOREIGN KEY ("student_id_ref") REFERENCES "Students"("student_id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "StudentParent"
            ADD CONSTRAINT "FK_0c01a1c2b7d68e60c370bfb0ba1" FOREIGN KEY ("parent_id_ref") REFERENCES "Parents"("parent_id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "Students"
            ADD CONSTRAINT "FK_27922daeef4021e3f0233b404e3" FOREIGN KEY ("student_class_class_name") REFERENCES "Class"("class_name") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "Students" DROP CONSTRAINT "FK_27922daeef4021e3f0233b404e3"
        `);
        await queryRunner.query(`
            ALTER TABLE "StudentParent" DROP CONSTRAINT "FK_0c01a1c2b7d68e60c370bfb0ba1"
        `);
        await queryRunner.query(`
            ALTER TABLE "StudentParent" DROP CONSTRAINT "FK_e8e2b04c3d7c255bca7754ae530"
        `);
        await queryRunner.query(`
            ALTER TABLE "Journal" DROP CONSTRAINT "FK_1505c47443cbc4730e0948a854e"
        `);
        await queryRunner.query(`
            ALTER TABLE "Journal" DROP CONSTRAINT "FK_9f846ca43a001c7b9a45eeacea7"
        `);
        await queryRunner.query(`
            ALTER TABLE "Timetable" DROP CONSTRAINT "FK_99df6e09a12c083be13a3f7cbf4"
        `);
        await queryRunner.query(`
            ALTER TABLE "Timetable" DROP CONSTRAINT "FK_b0dc30aeedf754f88c0dda55501"
        `);
        await queryRunner.query(`
            ALTER TABLE "Timetable" DROP CONSTRAINT "FK_9898ba104d570a10c2ec4851237"
        `);
        await queryRunner.query(`
            ALTER TABLE "Homework" DROP CONSTRAINT "FK_4483bc37d934bb3d30554d570f1"
        `);
        await queryRunner.query(`
            ALTER TABLE "Homework" DROP CONSTRAINT "FK_e05f26b490658570f942eccf82b"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_0c01a1c2b7d68e60c370bfb0ba"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_e8e2b04c3d7c255bca7754ae53"
        `);
        await queryRunner.query(`
            DROP TABLE "Class"
        `);
        await queryRunner.query(`
            DROP TABLE "Students"
        `);
        await queryRunner.query(`
            DROP TABLE "StudentParent"
        `);
        await queryRunner.query(`
            DROP TABLE "Parents"
        `);
        await queryRunner.query(`
            DROP TABLE "Journal"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."Journal_journal_status_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "Timetable"
        `);
        await queryRunner.query(`
            DROP TABLE "Teacher"
        `);
        await queryRunner.query(`
            DROP TABLE "Subject"
        `);
        await queryRunner.query(`
            DROP TABLE "Homework"
        `);
    }

}
