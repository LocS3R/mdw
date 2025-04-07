import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDB1743995723259 implements MigrationInterface {
  name = 'InitDB1743995723259';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "album_images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "filename" character varying(255) NOT NULL, "originalName" character varying(255) NOT NULL, "path" character varying(255) NOT NULL, "mimetype" character varying(255) NOT NULL, "size" integer NOT NULL, "caption" character varying(500), "order" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_66fd6ccce2caa0971343a9b6977" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "album_images"`);
  }
}
