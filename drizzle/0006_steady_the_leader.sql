CREATE TABLE IF NOT EXISTS "embeddings" (
	"id" serial NOT NULL,
	"tmdbId" integer NOT NULL,
	"embedding" vector(1536),
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT "embeddings_tmdbId_unique" UNIQUE("tmdbId")
);
--> statement-breakpoint
/*ALTER TABLE "entries" ADD COLUMN "tmdbId" integer;*/