/*ALTER TABLE "entries" RENAME COLUMN "genre" TO "genres";*/
ALTER TABLE "entries" ALTER COLUMN "genres" TYPE integer[] USING genres::integer[];
/*ALTER TABLE "embeddings" ADD PRIMARY KEY ("id");*/
--ALTER TABLE "embeddings" ADD COLUMN "type" varchar(256);
--ALTER TABLE "genres" ADD COLUMN "genreID" integer NOT NULL;
--ALTER TABLE "genres" ADD COLUMN "type" varchar(256);