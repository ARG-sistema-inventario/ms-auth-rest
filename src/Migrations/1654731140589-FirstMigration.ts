import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1654731140589 implements MigrationInterface {
    name = 'FirstMigration1654731140589'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`rol\` (\`id\` int NOT NULL AUTO_INCREMENT, \`description\` varchar(100) NOT NULL, \`enable\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_entity\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NOT NULL, \`email\` varchar(255) NULL, \`email_to_verificate\` varchar(255) NOT NULL, \`verification_at\` datetime NULL, \`password\` varchar(255) NOT NULL, \`verification_code\` varchar(10) NOT NULL, \`verification_code_password\` varchar(4) NULL, \`active\` tinyint NOT NULL DEFAULT 0, \`refresh_token\` text NULL, \`name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`rol_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category_entity\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(100) NOT NULL, \`enable\` tinyint NOT NULL DEFAULT 1, \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` ADD CONSTRAINT \`FK_fc41c06e95e4c3d4bae0b9806b3\` FOREIGN KEY (\`rol_id\`) REFERENCES \`rol\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`category_entity\` ADD CONSTRAINT \`FK_2a27182dab51db48ade71d12f05\` FOREIGN KEY (\`user_id\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`INSERT INTO \`rol\` (description) VALUES ('ADMIN'), ('USER')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category_entity\` DROP FOREIGN KEY \`FK_2a27182dab51db48ade71d12f05\``);
        await queryRunner.query(`ALTER TABLE \`user_entity\` DROP FOREIGN KEY \`FK_fc41c06e95e4c3d4bae0b9806b3\``);
        await queryRunner.query(`DROP TABLE \`category_entity\``);
        await queryRunner.query(`DROP TABLE \`user_entity\``);
        await queryRunner.query(`DROP TABLE \`rol\``);
    }

}
