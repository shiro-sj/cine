import { db } from "@/db";
import { entries, entriesOnGenre, genres, users } from "@/db/schema/users";
import { count, eq, and, gte, sum, countDistinct, desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request){
    try{
        const url = new URL(request.url);
        const username = url.searchParams.get("username");

        if (username){
            const comparisonDate = new Date();
            comparisonDate.setDate(1);  // Set to the first day of the month
            comparisonDate.setHours(0, 0, 0, 0);

            const dbUser = await db.select().from(users).where(eq(users.username, username))
            const tvLogs = await db.select({ count: count(entries.id)}).from(entries).where(and(eq(entries.type, 'tv'), eq(entries.userId, dbUser[0].id), gte(entries.date, comparisonDate)))
            const movieLogs = await db.select({ count: count(entries.id)}).from(entries).where(and(eq(entries.type, 'movie'), eq(entries.userId, dbUser[0].id), gte(entries.date, comparisonDate)))
            const watchTime = await db.select({ totalRuntime: sum(entries.runtime)}).from(entries).where(and( eq(entries.userId, dbUser[0].id), gte(entries.date, comparisonDate)))
            const topWatched = await db.select({ title: entries.title, entriesCount: countDistinct(entries.id) }).from(entries).where(and(eq(entries.userId, dbUser[0].id), gte(entries.date, comparisonDate))).groupBy(entries.tmdbId, entries.title).orderBy(desc(count(entries.id))).limit(5);
            const topGenres = await db.select({genreId: entriesOnGenre.genreId, name: genres.name, count: count(entriesOnGenre.id) }).from(entriesOnGenre).leftJoin(genres, eq(entriesOnGenre.genreId, genres.id)).where(and(eq(entriesOnGenre.userId, dbUser[0].id), gte(entriesOnGenre.date, comparisonDate))).groupBy(entriesOnGenre.genreId, genres.name).orderBy(desc(count(entriesOnGenre.id))).limit(5);

            return NextResponse.json({
                tvLogs: tvLogs[0],
                movieLogs: movieLogs[0],
                watchTime: watchTime[0],
                topWatched: topWatched,
                topGenres: topGenres,
              })
        }else{
        return new Response(`Error finding user.`, {status: 500})
        }
        
    }catch (error){
        return new Response(`${error}`, {status: 500} )
    }
}