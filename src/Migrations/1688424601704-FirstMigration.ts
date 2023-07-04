import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1688424601704 implements MigrationInterface {
    name = 'FirstMigration1688424601704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rol" ("id" SERIAL NOT NULL, "description" character varying(100) NOT NULL, "enable" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_c93a22388638fac311781c7f2dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_entity" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" SERIAL NOT NULL, "uuid" character varying(255) NOT NULL, "email" character varying(255), "email_to_verificate" character varying(255) NOT NULL, "verification_at" TIMESTAMP, "password" character varying(255) NOT NULL, "verification_code" character varying(10) NOT NULL, "verification_code_password" character varying(4), "active" boolean NOT NULL DEFAULT false, "refresh_token" character varying, "name" character varying(255) NOT NULL, "last_name" character varying(255) NOT NULL, "rol_id" integer, CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category_entity" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" character varying(100) NOT NULL, "enable" boolean NOT NULL DEFAULT true, "user_id" integer, CONSTRAINT "PK_1a38b9007ed8afab85026703a53" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "asset_entity" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "stock" boolean DEFAULT true, "stock_amount" integer NOT NULL DEFAULT '0', "price" integer NOT NULL DEFAULT '0', "enable" boolean NOT NULL DEFAULT true, "user_id" integer, "category_id" integer, CONSTRAINT "PK_038b7b28b83db2205747ef9912e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD CONSTRAINT "FK_fc41c06e95e4c3d4bae0b9806b3" FOREIGN KEY ("rol_id") REFERENCES "rol"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category_entity" ADD CONSTRAINT "FK_2a27182dab51db48ade71d12f05" FOREIGN KEY ("user_id") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "asset_entity" ADD CONSTRAINT "FK_509940740fede7555d89c104f54" FOREIGN KEY ("user_id") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "asset_entity" ADD CONSTRAINT "FK_dd8b918807fead118fb34818268" FOREIGN KEY ("category_id") REFERENCES "category_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`INSERT INTO "rol" (description) VALUES ('ADMIN'), ('USER')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "asset_entity" DROP CONSTRAINT "FK_dd8b918807fead118fb34818268"`);
        await queryRunner.query(`ALTER TABLE "asset_entity" DROP CONSTRAINT "FK_509940740fede7555d89c104f54"`);
        await queryRunner.query(`ALTER TABLE "category_entity" DROP CONSTRAINT "FK_2a27182dab51db48ade71d12f05"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP CONSTRAINT "FK_fc41c06e95e4c3d4bae0b9806b3"`);
        await queryRunner.query(`DROP TABLE "asset_entity"`);
        await queryRunner.query(`DROP TABLE "category_entity"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
        await queryRunner.query(`DROP TABLE "rol"`);
    }

}
