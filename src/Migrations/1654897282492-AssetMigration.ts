import {MigrationInterface, QueryRunner} from "typeorm";

export class AssetMigration1654897282492 implements MigrationInterface {
    name = 'AssetMigration1654897282492'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`asset_entity\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`stock\` tinyint NULL DEFAULT 1, \`stock_amount\` int NOT NULL DEFAULT '0', \`price\` int NOT NULL DEFAULT '0', \`enable\` tinyint NOT NULL DEFAULT 1, \`user_id\` int NULL, \`category_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`asset_entity\` ADD CONSTRAINT \`FK_509940740fede7555d89c104f54\` FOREIGN KEY (\`user_id\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`asset_entity\` ADD CONSTRAINT \`FK_dd8b918807fead118fb34818268\` FOREIGN KEY (\`category_id\`) REFERENCES \`category_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`asset_entity\` DROP FOREIGN KEY \`FK_dd8b918807fead118fb34818268\``);
        await queryRunner.query(`ALTER TABLE \`asset_entity\` DROP FOREIGN KEY \`FK_509940740fede7555d89c104f54\``);
        await queryRunner.query(`DROP TABLE \`asset_entity\``);
    }

}
