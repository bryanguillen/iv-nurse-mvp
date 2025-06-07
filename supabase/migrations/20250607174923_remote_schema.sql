

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "public"."create_nurse_and_org"("nurse_id" "uuid", "first_name" "text", "last_name" "text", "org_name" "text") RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
declare
  org_id uuid;
begin
  insert into organizations (id, name, created_by)
  values (gen_random_uuid(), org_name, nurse_id)
  returning id into org_id;

  insert into nurses (id, first_name, last_name, org_id)
  values (nurse_id, first_name, last_name, org_id);
end;
$$;


ALTER FUNCTION "public"."create_nurse_and_org"("nurse_id" "uuid", "first_name" "text", "last_name" "text", "org_name" "text") OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."addresses" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "line1" "text" NOT NULL,
    "line2" "text",
    "city" "text" NOT NULL,
    "state" "text" NOT NULL,
    "postal_code" "text" NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."addresses" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."nurses" (
    "id" "uuid" NOT NULL,
    "org_id" "uuid",
    "first_name" "text",
    "last_name" "text",
    "created_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."nurses" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."organizations" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "created_by" "uuid"
);


ALTER TABLE "public"."organizations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."patient_address_history" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "patient_id" "uuid",
    "address_id" "uuid",
    "changed_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."patient_address_history" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."patients" (
    "id" "uuid" NOT NULL,
    "first_name" "text" NOT NULL,
    "phone" "text" NOT NULL,
    "address_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "last_name" "text" NOT NULL
);


ALTER TABLE "public"."patients" OWNER TO "postgres";


ALTER TABLE ONLY "public"."addresses"
    ADD CONSTRAINT "addresses_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."nurses"
    ADD CONSTRAINT "nurses_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."organizations"
    ADD CONSTRAINT "organizations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."patient_address_history"
    ADD CONSTRAINT "patient_address_history_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."patients"
    ADD CONSTRAINT "patients_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."nurses"
    ADD CONSTRAINT "nurses_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."nurses"
    ADD CONSTRAINT "nurses_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."organizations"
    ADD CONSTRAINT "organizations_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."patient_address_history"
    ADD CONSTRAINT "patient_address_history_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "public"."addresses"("id");



ALTER TABLE ONLY "public"."patient_address_history"
    ADD CONSTRAINT "patient_address_history_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id");



ALTER TABLE ONLY "public"."patients"
    ADD CONSTRAINT "patients_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "public"."addresses"("id");



ALTER TABLE ONLY "public"."patients"
    ADD CONSTRAINT "patients_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



CREATE POLICY "Allow deleting own organization" ON "public"."organizations" FOR DELETE USING (("auth"."uid"() = "created_by"));



CREATE POLICY "Allow insert by logged-in user" ON "public"."organizations" FOR INSERT WITH CHECK (("auth"."uid"() = "created_by"));



CREATE POLICY "Allow insert of own nurse record" ON "public"."nurses" FOR INSERT WITH CHECK (("auth"."uid"() = "id"));



CREATE POLICY "Allow updating own nurse record" ON "public"."nurses" FOR UPDATE USING (("auth"."uid"() = "id"));



CREATE POLICY "Allow updating own organization" ON "public"."organizations" FOR UPDATE USING (("auth"."uid"() = "created_by"));



CREATE POLICY "Delete own nurse record" ON "public"."nurses" FOR DELETE USING (("auth"."uid"() = "id"));



CREATE POLICY "Patient can select self" ON "public"."patients" FOR SELECT USING (("id" = "auth"."uid"()));



CREATE POLICY "Service role can insert patients" ON "public"."patients" FOR INSERT WITH CHECK (("auth"."role"() = 'service_role'::"text"));





ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";






GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";











































































































































































GRANT ALL ON FUNCTION "public"."create_nurse_and_org"("nurse_id" "uuid", "first_name" "text", "last_name" "text", "org_name" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."create_nurse_and_org"("nurse_id" "uuid", "first_name" "text", "last_name" "text", "org_name" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."create_nurse_and_org"("nurse_id" "uuid", "first_name" "text", "last_name" "text", "org_name" "text") TO "service_role";


















GRANT ALL ON TABLE "public"."addresses" TO "anon";
GRANT ALL ON TABLE "public"."addresses" TO "authenticated";
GRANT ALL ON TABLE "public"."addresses" TO "service_role";



GRANT ALL ON TABLE "public"."nurses" TO "anon";
GRANT ALL ON TABLE "public"."nurses" TO "authenticated";
GRANT ALL ON TABLE "public"."nurses" TO "service_role";



GRANT ALL ON TABLE "public"."organizations" TO "anon";
GRANT ALL ON TABLE "public"."organizations" TO "authenticated";
GRANT ALL ON TABLE "public"."organizations" TO "service_role";



GRANT ALL ON TABLE "public"."patient_address_history" TO "anon";
GRANT ALL ON TABLE "public"."patient_address_history" TO "authenticated";
GRANT ALL ON TABLE "public"."patient_address_history" TO "service_role";



GRANT ALL ON TABLE "public"."patients" TO "anon";
GRANT ALL ON TABLE "public"."patients" TO "authenticated";
GRANT ALL ON TABLE "public"."patients" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
