import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1749303079613 implements MigrationInterface {
    name = 'Init1749303079613'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "nurse_availability" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nurse_id" uuid NOT NULL, "day_of_week" integer NOT NULL, "start_time" TIME NOT NULL, "end_time" TIME NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cbbe81d8ac13cbd5119c20d5b23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "nurse_service" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nurse_id" uuid NOT NULL, "name" character varying NOT NULL, "duration_minutes" integer NOT NULL, "price" numeric, "description" text, "top_pick" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f66edb6ed7a6b8205b66358b19a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "organization_uuid" ("id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_46ffa6e38303dbf4f7270b6c8ee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "nurse_uuids" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "supabase_id" character varying NOT NULL, "timezone" text NOT NULL DEFAULT 'America/New_York', "organization_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a0e5c7925a0b09f591ab37da51c" UNIQUE ("supabase_id"), CONSTRAINT "PK_ecb35214b0b6fbd0b4826227d57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "booking" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nurse_id" uuid NOT NULL, "person_id" uuid NOT NULL, "service_id" uuid NOT NULL, "start_time" TIMESTAMP WITH TIME ZONE NOT NULL, "end_time" TIMESTAMP WITH TIME ZONE NOT NULL, "notes" text, "status" character varying NOT NULL DEFAULT 'booked', "is_rebooking" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "person_uuid" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "supabase_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f4206403c2d76e1072755f6731c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "nurse_stats" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nurse_id" uuid NOT NULL, "rebookings_count" integer NOT NULL DEFAULT '0', "new_customers_count" integer NOT NULL DEFAULT '0', "rebookings_revenue" numeric NOT NULL DEFAULT '0', "new_customers_revenue" numeric NOT NULL DEFAULT '0', "total_revenue" numeric NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b6a09ca258ce2e7dcc0d57325e7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "nurse_availability" ADD CONSTRAINT "FK_df17501aa4bdc0d9844f481651a" FOREIGN KEY ("nurse_id") REFERENCES "nurse_uuids"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nurse_service" ADD CONSTRAINT "FK_a81542ebc6f13ba1090088700d2" FOREIGN KEY ("nurse_id") REFERENCES "nurse_uuids"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nurse_uuids" ADD CONSTRAINT "FK_e4eef2d3aeef56c676f0e6600bc" FOREIGN KEY ("organization_id") REFERENCES "organization_uuid"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_029055667c418b06e4f5cf4b882" FOREIGN KEY ("nurse_id") REFERENCES "nurse_uuids"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_2d8076e148244106a993e28a0c2" FOREIGN KEY ("person_id") REFERENCES "person_uuid"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_227cfeeee338c1e04fab754e56b" FOREIGN KEY ("service_id") REFERENCES "nurse_service"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nurse_stats" ADD CONSTRAINT "FK_d74b73901ef588cb34f4f79378f" FOREIGN KEY ("nurse_id") REFERENCES "nurse_uuids"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nurse_stats" DROP CONSTRAINT "FK_d74b73901ef588cb34f4f79378f"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_227cfeeee338c1e04fab754e56b"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_2d8076e148244106a993e28a0c2"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_029055667c418b06e4f5cf4b882"`);
        await queryRunner.query(`ALTER TABLE "nurse_uuids" DROP CONSTRAINT "FK_e4eef2d3aeef56c676f0e6600bc"`);
        await queryRunner.query(`ALTER TABLE "nurse_service" DROP CONSTRAINT "FK_a81542ebc6f13ba1090088700d2"`);
        await queryRunner.query(`ALTER TABLE "nurse_availability" DROP CONSTRAINT "FK_df17501aa4bdc0d9844f481651a"`);
        await queryRunner.query(`DROP TABLE "nurse_stats"`);
        await queryRunner.query(`DROP TABLE "person_uuid"`);
        await queryRunner.query(`DROP TABLE "booking"`);
        await queryRunner.query(`DROP TABLE "nurse_uuids"`);
        await queryRunner.query(`DROP TABLE "organization_uuid"`);
        await queryRunner.query(`DROP TABLE "nurse_service"`);
        await queryRunner.query(`DROP TABLE "nurse_availability"`);
    }

}
