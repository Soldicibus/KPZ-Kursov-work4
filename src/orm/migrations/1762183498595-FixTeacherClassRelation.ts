import {MigrationInterface, QueryRunner} from "typeorm";

export class FixTeacherClassRelation1762183498595 implements MigrationInterface {
    name = 'FixTeacherClassRelation1762183498595'

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
            ALTER TABLE "Class" DROP CONSTRAINT "UQ_9bcecb616dd208f14ed2798ed82"
        `);
        await queryRunner.query(`
            ALTER TABLE "Class" DROP COLUMN "class_teacher"
        `);
        await queryRunner.query(`
            ALTER TABLE "Teacher"
            ADD "teacher_class_class_name" character varying(10)
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_e8e2b04c3d7c255bca7754ae53" ON "StudentParent" ("student_id_ref")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_0c01a1c2b7d68e60c370bfb0ba" ON "StudentParent" ("parent_id_ref")
        `);
        await queryRunner.query(`
            ALTER TABLE "Teacher"
            ADD CONSTRAINT "FK_c4a5676c0d134c695b13a192cb6" FOREIGN KEY ("teacher_class_class_name") REFERENCES "Class"("class_name") ON DELETE CASCADE ON UPDATE NO ACTION
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
            ALTER TABLE "Teacher" DROP CONSTRAINT "FK_c4a5676c0d134c695b13a192cb6"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_0c01a1c2b7d68e60c370bfb0ba"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_e8e2b04c3d7c255bca7754ae53"
        `);
        await queryRunner.query(`
            ALTER TABLE "Teacher" DROP COLUMN "teacher_class_class_name"
        `);
        await queryRunner.query(`
            ALTER TABLE "Class"
            ADD "class_teacher" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "Class"
            ADD CONSTRAINT "UQ_9bcecb616dd208f14ed2798ed82" UNIQUE ("class_teacher")
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
