CREATE TABLE IF NOT EXISTS "entries" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256),
	"date" timestamp DEFAULT now(),
	"userId" integer,
	"genre" varchar(256),
	"review" text,
	"rating" numeric
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "entries_genre" (
	"entryId" integer NOT NULL,
	"genreId" integer NOT NULL,
	CONSTRAINT "entries_genre_entryId_genreId_pk" PRIMARY KEY("entryId","genreId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "genres" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"clerkId" varchar(256),
	"username" varchar,
	"email" text,
	"bio" text,
	"imageUrl" text,
	CONSTRAINT "users_clerkId_unique" UNIQUE("clerkId"),
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "entries_genre" ADD CONSTRAINT "entries_genre_entryId_entries_id_fk" FOREIGN KEY ("entryId") REFERENCES "public"."entries"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "entries_genre" ADD CONSTRAINT "entries_genre_genreId_genres_id_fk" FOREIGN KEY ("genreId") REFERENCES "public"."genres"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
