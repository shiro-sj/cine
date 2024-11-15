ALTER TABLE "entries" ALTER COLUMN "userId" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "entries" ADD CONSTRAINT "entries_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
