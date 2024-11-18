CREATE TABLE IF NOT EXISTS "friends" (
	"id" serial NOT NULL,
	"sendDate" date,
	"respondDate" date,
	"senderId" integer,
	"receiverId" integer,
	"status" varchar(256) DEFAULT 'pending' NOT NULL,
	CONSTRAINT "friends_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "friendsOnUsers" (
	"id" serial NOT NULL,
	"senderId" integer NOT NULL,
	"receiverId" integer NOT NULL,
	CONSTRAINT "friendsOnUsers_senderId_receiverId_pk" PRIMARY KEY("senderId","receiverId"),
	CONSTRAINT "friendsOnUsers_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "entries" ADD COLUMN "runtime" integer;--> statement-breakpoint
ALTER TABLE "entries_genre" ADD COLUMN "id" serial NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "friendsOnUsers" ADD CONSTRAINT "friendsOnUsers_senderId_users_id_fk" FOREIGN KEY ("senderId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "friendsOnUsers" ADD CONSTRAINT "friendsOnUsers_receiverId_users_id_fk" FOREIGN KEY ("receiverId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "entries_genre" ADD CONSTRAINT "entries_genre_id_unique" UNIQUE("id");