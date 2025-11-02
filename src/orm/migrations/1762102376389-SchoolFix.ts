import {MigrationInterface, QueryRunner} from "typeorm";

export class SchoolFix1762102376389 implements MigrationInterface {
    name = 'SchoolFix1762102376389'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "StudentParent" DROP CONSTRAINT "FK_e8e2b04c3d7c255bca7754ae530"
        `);
        await queryRunner.query(`
            ALTER TABLE "StudentParent" DROP CONSTRAINT "FK_0c01a1c2b7d68e60c370bfb0ba1"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_e8e2b04c3d7c255bca7754ae53"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_0c01a1c2b7d68e60c370bfb0ba"
        `);
        await queryRunner.query(`
            ALTER TABLE "Teacher" DROP CONSTRAINT "CHK_b841c4c8a8912abb1e673fd427"
        `);
        await queryRunner.query(`
            ALTER TABLE "Parents" DROP CONSTRAINT "CHK_54e53b02fc90ba4d5f2ba685f3"
        `);
        await queryRunner.query(`
            ALTER TABLE "Students" DROP CONSTRAINT "CHK_6b49691b7a921a8d2c6570f866"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "email"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "email" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "username"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "username" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "name"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "name" character varying
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_e8e2b04c3d7c255bca7754ae53" ON "StudentParent" ("student_id_ref")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_0c01a1c2b7d68e60c370bfb0ba" ON "StudentParent" ("parent_id_ref")
        `);
        await queryRunner.query(`
            ALTER TABLE "Teacher"
            ADD CONSTRAINT "CHK_f647c5add340f7bd9e99bf883e" CHECK (
                    "teacher_phone" ~ '^0[3-9][0-9]-[0-9]{3}-[0-9]{4}$'
                )
        `);
        await queryRunner.query(`
            ALTER TABLE "Parents"
            ADD CONSTRAINT "CHK_96a4790ac795a0dbea4efdd0b6" CHECK (
                    "parent_phone" ~ '^0[3-9][0-9]-[0-9]{3}-[0-9]{4}$'
                )
        `);
        await queryRunner.query(`
            ALTER TABLE "Students"
            ADD CONSTRAINT "CHK_5a21586fbe2a70dcfc01d06c1f" CHECK (
                    "student_phone" ~ '^0[3-9][0-9]-[0-9]{3}-[0-9]{4}$'
                )
        `);
        await queryRunner.query(`
            ALTER TABLE "StudentParent"
            ADD CONSTRAINT "FK_e8e2b04c3d7c255bca7754ae530" FOREIGN KEY ("student_id_ref") REFERENCES "Students"("student_id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "StudentParent"
            ADD CONSTRAINT "FK_0c01a1c2b7d68e60c370bfb0ba1" FOREIGN KEY ("parent_id_ref") REFERENCES "Parents"("parent_id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "StudentParent" DROP CONSTRAINT "FK_0c01a1c2b7d68e60c370bfb0ba1"
        `);
        await queryRunner.query(`
            ALTER TABLE "StudentParent" DROP CONSTRAINT "FK_e8e2b04c3d7c255bca7754ae530"
        `);
        await queryRunner.query(`
            ALTER TABLE "Students" DROP CONSTRAINT "CHK_5a21586fbe2a70dcfc01d06c1f"
        `);
        await queryRunner.query(`
            ALTER TABLE "Parents" DROP CONSTRAINT "CHK_96a4790ac795a0dbea4efdd0b6"
        `);
        await queryRunner.query(`
            ALTER TABLE "Teacher" DROP CONSTRAINT "CHK_f647c5add340f7bd9e99bf883e"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_0c01a1c2b7d68e60c370bfb0ba"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_e8e2b04c3d7c255bca7754ae53"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "name"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "name" character varying(40)
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "username"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "username" character varying(40)
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "email"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "email" character varying(100) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")
        `);
        await queryRunner.query(`
            ALTER TABLE "Students"
            ADD CONSTRAINT "CHK_6b49691b7a921a8d2c6570f866" CHECK (
                    (
                        (student_phone)::text ~ '^0[3-9]d{1}-d{3}-d{4}$'::text
                    )
                )
        `);
        await queryRunner.query(`
            ALTER TABLE "Parents"
            ADD CONSTRAINT "CHK_54e53b02fc90ba4d5f2ba685f3" CHECK (
                    (
                        (parent_phone)::text ~ '^0[3-9]d{1}-d{3}-d{4}$'::text
                    )
                )
        `);
        await queryRunner.query(`
            ALTER TABLE "Teacher"
            ADD CONSTRAINT "CHK_b841c4c8a8912abb1e673fd427" CHECK (
                    (
                        (teacher_phone)::text ~ '^0[3-9]d{1}-d{3}-d{4}$'::text
                    )
                )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_0c01a1c2b7d68e60c370bfb0ba" ON "StudentParent" ("parent_id_ref")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_e8e2b04c3d7c255bca7754ae53" ON "StudentParent" ("student_id_ref")
        `);
        await queryRunner.query(`
            ALTER TABLE "StudentParent"
            ADD CONSTRAINT "FK_0c01a1c2b7d68e60c370bfb0ba1" FOREIGN KEY ("parent_id_ref") REFERENCES "Parents"("parent_id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "StudentParent"
            ADD CONSTRAINT "FK_e8e2b04c3d7c255bca7754ae530" FOREIGN KEY ("student_id_ref") REFERENCES "Students"("student_id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

}
