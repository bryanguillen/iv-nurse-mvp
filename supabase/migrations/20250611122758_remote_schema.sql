drop policy "Allow insert of own nurse record" on "public"."nurses";

drop policy "Allow updating own nurse record" on "public"."nurses";

drop policy "Delete own nurse record" on "public"."nurses";

drop policy "Allow deleting own organization" on "public"."organizations";

drop policy "Allow insert by logged-in user" on "public"."organizations";

drop policy "Allow updating own organization" on "public"."organizations";

drop policy "Patient can select self" on "public"."patients";

drop policy "Service role can insert patients" on "public"."patients";

create table "public"."nurse_patient" (
    "id" uuid not null default gen_random_uuid(),
    "nurse_id" uuid,
    "patient_id" uuid
);


alter table "public"."nurse_patient" enable row level security;

alter table "public"."addresses" enable row level security;

alter table "public"."nurses" enable row level security;

alter table "public"."organizations" enable row level security;

alter table "public"."patient_address_history" enable row level security;

alter table "public"."patients" enable row level security;

CREATE UNIQUE INDEX nurse_patient_nurse_id_patient_id_key ON public.nurse_patient USING btree (nurse_id, patient_id);

CREATE UNIQUE INDEX nurse_patient_pkey ON public.nurse_patient USING btree (id);

alter table "public"."nurse_patient" add constraint "nurse_patient_pkey" PRIMARY KEY using index "nurse_patient_pkey";

alter table "public"."nurse_patient" add constraint "nurse_patient_nurse_id_fkey" FOREIGN KEY (nurse_id) REFERENCES nurses(id) not valid;

alter table "public"."nurse_patient" validate constraint "nurse_patient_nurse_id_fkey";

alter table "public"."nurse_patient" add constraint "nurse_patient_nurse_id_patient_id_key" UNIQUE using index "nurse_patient_nurse_id_patient_id_key";

alter table "public"."nurse_patient" add constraint "nurse_patient_patient_id_fkey" FOREIGN KEY (patient_id) REFERENCES patients(id) not valid;

alter table "public"."nurse_patient" validate constraint "nurse_patient_patient_id_fkey";

grant delete on table "public"."nurse_patient" to "anon";

grant insert on table "public"."nurse_patient" to "anon";

grant references on table "public"."nurse_patient" to "anon";

grant select on table "public"."nurse_patient" to "anon";

grant trigger on table "public"."nurse_patient" to "anon";

grant truncate on table "public"."nurse_patient" to "anon";

grant update on table "public"."nurse_patient" to "anon";

grant delete on table "public"."nurse_patient" to "authenticated";

grant insert on table "public"."nurse_patient" to "authenticated";

grant references on table "public"."nurse_patient" to "authenticated";

grant select on table "public"."nurse_patient" to "authenticated";

grant trigger on table "public"."nurse_patient" to "authenticated";

grant truncate on table "public"."nurse_patient" to "authenticated";

grant update on table "public"."nurse_patient" to "authenticated";

grant delete on table "public"."nurse_patient" to "service_role";

grant insert on table "public"."nurse_patient" to "service_role";

grant references on table "public"."nurse_patient" to "service_role";

grant select on table "public"."nurse_patient" to "service_role";

grant trigger on table "public"."nurse_patient" to "service_role";

grant truncate on table "public"."nurse_patient" to "service_role";

grant update on table "public"."nurse_patient" to "service_role";

create policy "Block all reads"
on "public"."addresses"
as permissive
for select
to public
using (false);


create policy "Block all writes"
on "public"."addresses"
as permissive
for all
to public
using (false);


create policy "Block all reads"
on "public"."nurse_patient"
as permissive
for select
to public
using (false);


create policy "Block all writes"
on "public"."nurse_patient"
as permissive
for all
to public
using (false);


create policy "Allow all users to read nurse data"
on "public"."nurses"
as permissive
for select
to public
using (true);


create policy "Nurse can delete own record"
on "public"."nurses"
as permissive
for delete
to public
using ((id = auth.uid()));


create policy "Nurse can update own record"
on "public"."nurses"
as permissive
for update
to public
using ((id = auth.uid()));


create policy "Allow all users to read organizations"
on "public"."organizations"
as permissive
for select
to public
using (true);


create policy "Only creator can delete organization"
on "public"."organizations"
as permissive
for delete
to public
using ((created_by = auth.uid()));


create policy "Only creator can update organization"
on "public"."organizations"
as permissive
for update
to public
using ((created_by = auth.uid()));


create policy "Block all reads"
on "public"."patient_address_history"
as permissive
for select
to public
using (false);


create policy "Block all writes"
on "public"."patient_address_history"
as permissive
for all
to public
using (false);


create policy "Block all reads"
on "public"."patients"
as permissive
for select
to public
using (false);


create policy "Block all writes"
on "public"."patients"
as permissive
for all
to public
using (false);



