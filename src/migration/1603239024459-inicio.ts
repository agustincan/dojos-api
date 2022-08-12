import {MigrationInterface, QueryRunner} from "typeorm";

export class inicio1603239024459 implements MigrationInterface {
    name = 'inicio1603239024459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "school_type" ("id" integer NOT NULL, "name" character varying(20) NOT NULL, "isActive" boolean DEFAULT true, CONSTRAINT "PK_c8a78eeac92045e39ce56d65641" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "graduation" ("id" integer NOT NULL, "name" character varying(20) NOT NULL, "isActive" boolean DEFAULT true, "typeId" integer, CONSTRAINT "PK_851f252789ac898013dd3f5a2a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "student_type" ("id" integer NOT NULL, "name" character varying(20) NOT NULL, "isActive" boolean DEFAULT true, CONSTRAINT "PK_41ee01f0b0e6e6e7edd3b983949" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "school" ("id" SERIAL NOT NULL, "name" character varying(80) NOT NULL, "address" character varying(100), "avatar" character varying(200), "typeId" integer, "parentId" integer, "directorId" integer, CONSTRAINT "PK_57836c3fe2f2c7734b20911755e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_28d550f784b541b8190fba64fc" ON "school" ("name", "parentId") `);
        await queryRunner.query(`CREATE TABLE "user_role" ("id" integer NOT NULL, "name" character varying(20) NOT NULL, "isActive" boolean DEFAULT true, CONSTRAINT "PK_fb2e442d14add3cefbdf33c4561" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "isActive" boolean, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userName" character varying(15), "password" character varying, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_da5934070b5f2726ebfd3122c8" ON "user" ("userName") `);
        await queryRunner.query(`CREATE TABLE "student" ("id" SERIAL NOT NULL, "isActive" boolean, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying(100), "lastName" character varying(100), "address" character varying(100), "addressNumber" integer, "age" integer, "email" character varying(50), "birthDate" TIMESTAMP, "avatar" character varying(200), "typeId" integer, "userId" integer, CONSTRAINT "REL_b35463776b4a11a3df3c30d920" UNIQUE ("userId"), CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1ba4a85e7508fd7254b513bc9a" ON "student" ("firstName", "lastName") `);
        await queryRunner.query(`CREATE TABLE "exam" ("id" SERIAL NOT NULL, "isActive" boolean, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "date" TIMESTAMP, "comment" character varying, "escuela" character varying, "escuela3" character varying, "studentId" integer, "graduationId" integer, CONSTRAINT "PK_56071ab3a94aeac01f1b5ab74aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_4554c565045a2a91c447278254" ON "exam" ("studentId", "graduationId") `);
        await queryRunner.query(`CREATE TABLE "school_users_user" ("schoolId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_6e91e077c81f18ff34f88bd94d2" PRIMARY KEY ("schoolId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dc0cd81675a3c6f13d5f321c85" ON "school_users_user" ("schoolId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0f52b10b3f3d1b91fb8ed671cf" ON "school_users_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "school_students_student" ("schoolId" integer NOT NULL, "studentId" integer NOT NULL, CONSTRAINT "PK_84e772a8b412bf9a120c439944b" PRIMARY KEY ("schoolId", "studentId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c9f4ad48505a577089dc732b79" ON "school_students_student" ("schoolId") `);
        await queryRunner.query(`CREATE INDEX "IDX_53e194ebbe8ae8e0d5541b0068" ON "school_students_student" ("studentId") `);
        await queryRunner.query(`CREATE TABLE "user_roles" ("userId" integer NOT NULL, "userRoleId" integer NOT NULL, CONSTRAINT "PK_6158b5ec966d909a7b398b8ec11" PRIMARY KEY ("userId", "userRoleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_472b25323af01488f1f66a06b6" ON "user_roles" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_46277e240fbb5ff1f777543f24" ON "user_roles" ("userRoleId") `);
        await queryRunner.query(`ALTER TABLE "graduation" ADD CONSTRAINT "FK_71e13be62e695a128f2f4846e27" FOREIGN KEY ("typeId") REFERENCES "school_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "school" ADD CONSTRAINT "FK_b1b499ceed9e5ec38e3ff5a5ce1" FOREIGN KEY ("typeId") REFERENCES "school_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "school" ADD CONSTRAINT "FK_125351d6285f95fa5dbfbffe725" FOREIGN KEY ("parentId") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "school" ADD CONSTRAINT "FK_bbfa0c35398b642f1e3903e9789" FOREIGN KEY ("directorId") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_80debfc6ace6fd18927a4f61fa7" FOREIGN KEY ("typeId") REFERENCES "student_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_b35463776b4a11a3df3c30d920a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exam" ADD CONSTRAINT "FK_40c627494e3303a46f93eb8e811" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exam" ADD CONSTRAINT "FK_0b8d41ddbc367e9182706d80b27" FOREIGN KEY ("graduationId") REFERENCES "graduation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "school_users_user" ADD CONSTRAINT "FK_dc0cd81675a3c6f13d5f321c853" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "school_users_user" ADD CONSTRAINT "FK_0f52b10b3f3d1b91fb8ed671cf2" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "school_students_student" ADD CONSTRAINT "FK_c9f4ad48505a577089dc732b798" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "school_students_student" ADD CONSTRAINT "FK_53e194ebbe8ae8e0d5541b0068e" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_472b25323af01488f1f66a06b67" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_46277e240fbb5ff1f777543f248" FOREIGN KEY ("userRoleId") REFERENCES "user_role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_46277e240fbb5ff1f777543f248"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_472b25323af01488f1f66a06b67"`);
        await queryRunner.query(`ALTER TABLE "school_students_student" DROP CONSTRAINT "FK_53e194ebbe8ae8e0d5541b0068e"`);
        await queryRunner.query(`ALTER TABLE "school_students_student" DROP CONSTRAINT "FK_c9f4ad48505a577089dc732b798"`);
        await queryRunner.query(`ALTER TABLE "school_users_user" DROP CONSTRAINT "FK_0f52b10b3f3d1b91fb8ed671cf2"`);
        await queryRunner.query(`ALTER TABLE "school_users_user" DROP CONSTRAINT "FK_dc0cd81675a3c6f13d5f321c853"`);
        await queryRunner.query(`ALTER TABLE "exam" DROP CONSTRAINT "FK_0b8d41ddbc367e9182706d80b27"`);
        await queryRunner.query(`ALTER TABLE "exam" DROP CONSTRAINT "FK_40c627494e3303a46f93eb8e811"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_b35463776b4a11a3df3c30d920a"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_80debfc6ace6fd18927a4f61fa7"`);
        await queryRunner.query(`ALTER TABLE "school" DROP CONSTRAINT "FK_bbfa0c35398b642f1e3903e9789"`);
        await queryRunner.query(`ALTER TABLE "school" DROP CONSTRAINT "FK_125351d6285f95fa5dbfbffe725"`);
        await queryRunner.query(`ALTER TABLE "school" DROP CONSTRAINT "FK_b1b499ceed9e5ec38e3ff5a5ce1"`);
        await queryRunner.query(`ALTER TABLE "graduation" DROP CONSTRAINT "FK_71e13be62e695a128f2f4846e27"`);
        await queryRunner.query(`DROP INDEX "IDX_46277e240fbb5ff1f777543f24"`);
        await queryRunner.query(`DROP INDEX "IDX_472b25323af01488f1f66a06b6"`);
        await queryRunner.query(`DROP TABLE "user_roles"`);
        await queryRunner.query(`DROP INDEX "IDX_53e194ebbe8ae8e0d5541b0068"`);
        await queryRunner.query(`DROP INDEX "IDX_c9f4ad48505a577089dc732b79"`);
        await queryRunner.query(`DROP TABLE "school_students_student"`);
        await queryRunner.query(`DROP INDEX "IDX_0f52b10b3f3d1b91fb8ed671cf"`);
        await queryRunner.query(`DROP INDEX "IDX_dc0cd81675a3c6f13d5f321c85"`);
        await queryRunner.query(`DROP TABLE "school_users_user"`);
        await queryRunner.query(`DROP INDEX "IDX_4554c565045a2a91c447278254"`);
        await queryRunner.query(`DROP TABLE "exam"`);
        await queryRunner.query(`DROP INDEX "IDX_1ba4a85e7508fd7254b513bc9a"`);
        await queryRunner.query(`DROP TABLE "student"`);
        await queryRunner.query(`DROP INDEX "IDX_da5934070b5f2726ebfd3122c8"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "user_role"`);
        await queryRunner.query(`DROP INDEX "IDX_28d550f784b541b8190fba64fc"`);
        await queryRunner.query(`DROP TABLE "school"`);
        await queryRunner.query(`DROP TABLE "student_type"`);
        await queryRunner.query(`DROP TABLE "graduation"`);
        await queryRunner.query(`DROP TABLE "school_type"`);
    }

}
