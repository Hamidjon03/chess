import { MigrationInterface, QueryRunner } from "typeorm";

export class First1721498433627 implements MigrationInterface {
    name = 'First1721498433627'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "match" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_update_at" TIMESTAMP NOT NULL DEFAULT now(), "result" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "score" integer NOT NULL, "tournamentId" integer, "player1Id" integer, "player2Id" integer, CONSTRAINT "PK_92b6c3a6631dd5b24a67c69f69d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tournament" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_update_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(50) NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_449f912ba2b62be003f0c22e767" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "leaderboard" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_update_at" TIMESTAMP NOT NULL DEFAULT now(), "score" integer NOT NULL, "rank" character varying(50) NOT NULL, "playerId" integer, "tournamentId" integer, CONSTRAINT "PK_76fd1d52cf44d209920f73f4608" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "player" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_update_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(50) NOT NULL, "age" integer NOT NULL, "rating" integer NOT NULL, "country" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "REL_7687919bf054bf262c669d3ae2" UNIQUE ("userId"), CONSTRAINT "PK_65edadc946a7faf4b638d5e8885" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_update_at" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying NOT NULL, "login" character varying(36) NOT NULL, "password" text NOT NULL, "role" text NOT NULL, CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tournament_participants_player" ("tournamentId" integer NOT NULL, "playerId" integer NOT NULL, CONSTRAINT "PK_a6761c582669f325441c9a5b473" PRIMARY KEY ("tournamentId", "playerId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ef6e678c6b95ded12001569054" ON "tournament_participants_player" ("tournamentId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f08f129529b6aa946ecf51a7f1" ON "tournament_participants_player" ("playerId") `);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_b096f0c0ca94610b3e77128500c" FOREIGN KEY ("tournamentId") REFERENCES "tournament"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_7ecd38eb2baa65327de8fc6021f" FOREIGN KEY ("player1Id") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_d1f05e5fc2a7f92e29c8e3c8e0f" FOREIGN KEY ("player2Id") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "leaderboard" ADD CONSTRAINT "FK_24c7e5e28ea0705876847710f97" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "leaderboard" ADD CONSTRAINT "FK_c1eef874c099e0d3b7fbacf0413" FOREIGN KEY ("tournamentId") REFERENCES "tournament"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "player" ADD CONSTRAINT "FK_7687919bf054bf262c669d3ae21" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tournament_participants_player" ADD CONSTRAINT "FK_ef6e678c6b95ded12001569054c" FOREIGN KEY ("tournamentId") REFERENCES "tournament"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tournament_participants_player" ADD CONSTRAINT "FK_f08f129529b6aa946ecf51a7f1c" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tournament_participants_player" DROP CONSTRAINT "FK_f08f129529b6aa946ecf51a7f1c"`);
        await queryRunner.query(`ALTER TABLE "tournament_participants_player" DROP CONSTRAINT "FK_ef6e678c6b95ded12001569054c"`);
        await queryRunner.query(`ALTER TABLE "player" DROP CONSTRAINT "FK_7687919bf054bf262c669d3ae21"`);
        await queryRunner.query(`ALTER TABLE "leaderboard" DROP CONSTRAINT "FK_c1eef874c099e0d3b7fbacf0413"`);
        await queryRunner.query(`ALTER TABLE "leaderboard" DROP CONSTRAINT "FK_24c7e5e28ea0705876847710f97"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_d1f05e5fc2a7f92e29c8e3c8e0f"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_7ecd38eb2baa65327de8fc6021f"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_b096f0c0ca94610b3e77128500c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f08f129529b6aa946ecf51a7f1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ef6e678c6b95ded12001569054"`);
        await queryRunner.query(`DROP TABLE "tournament_participants_player"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "player"`);
        await queryRunner.query(`DROP TABLE "leaderboard"`);
        await queryRunner.query(`DROP TABLE "tournament"`);
        await queryRunner.query(`DROP TABLE "match"`);
    }

}
