import { users, entries, entriesOnGenre, genres } from "@/db/schema/users";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/db"
import { eq, and, gte, sum, countDistinct, desc, count } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getDayOfWeek } from "@/lib/helpers";

export async function GET(){

    try{
        const user = await currentUser();
        const setback = 168; //168 hours a week

        if (user){
            const comparisonDate = new Date();
            comparisonDate.setUTCHours(comparisonDate.getHours() - setback);

            const dbUser = await db.select().from(users).where(eq(users.clerkId, user.id))
            const tvLogs = await db.select({name: entries.title, count:count(entries.id)}).from(entries).where(and(eq(entries.userId, dbUser[0].id), eq(entries.type, "tv"), gte(entries.date, comparisonDate))).groupBy(entries.tmdbId, entries.title).orderBy(desc(count(entries.id)))
            const topGenres = await db.select({genreId: entriesOnGenre.genreId, name: genres.name, count: count(entriesOnGenre.id) }).from(entriesOnGenre).leftJoin(genres, eq(entriesOnGenre.genreId, genres.id)).where(and(eq(entriesOnGenre.userId, dbUser[0].id), gte(entriesOnGenre.date, comparisonDate))).groupBy(entriesOnGenre.genreId, genres.name).orderBy(desc(count(entriesOnGenre.id)));

            const tvGenres = await db.select({genreId: entriesOnGenre.genreId, name: genres.name, count: count(entriesOnGenre.id) }).from(entriesOnGenre).leftJoin(genres, eq(entriesOnGenre.genreId, genres.id)).where(and(eq(entriesOnGenre.userId, dbUser[0].id), gte(entriesOnGenre.date, comparisonDate), eq(entriesOnGenre.type, 'tv'))).groupBy(entriesOnGenre.genreId, genres.name).orderBy(desc(count(entriesOnGenre.id)));
            const movieGenres = await db.select({genreId: entriesOnGenre.genreId, name: genres.name, count: count(entriesOnGenre.id) }).from(entriesOnGenre).leftJoin(genres, eq(entriesOnGenre.genreId, genres.id)).where(and(eq(entriesOnGenre.userId, dbUser[0].id), gte(entriesOnGenre.date, comparisonDate), eq(entriesOnGenre.type, 'movie'))).groupBy(entriesOnGenre.genreId, genres.name).orderBy(desc(count(entriesOnGenre.id)));
            const watchTime = await db.select({ totalRuntime: sum(entries.runtime)}).from(entries).where(and(eq(entries.userId, dbUser[0].id), gte(entries.date, comparisonDate)))
            const dailyStats = await db.select({day: entries.date, entryCount: count(entries.id),})
                .from(entries)
                .where(and(gte(entries.date, comparisonDate), eq(entries.userId, dbUser[0].id)))
                .groupBy(entries.date)
                .orderBy(entries.date);


            const weekdayEntries = dailyStats.reduce((acc: any[], entry: any) => {
                const dayOfWeek = getDayOfWeek(entry.day); 
                const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayOfWeek];

                const existingDay = acc.find((item) => item.dayOfWeek === dayName);
                
                if (existingDay) {
                    existingDay.entryCount += entry.entryCount; 
                } else {
                    acc.push({
                        dayOfWeek: dayName,
                        entryCount: entry.entryCount,
                    });
                }
                return acc;
            }, []);

            return NextResponse.json({
                watchTime: watchTime,
                topGenres: topGenres,
                tvLogs: tvLogs,
                tvGenres:tvGenres,
                movieGenres: movieGenres,
                weekdayEntries: weekdayEntries,
              })

        }else{
        return new Response(`Error finding user.`, {status: 500})
        }
        
    }catch (error){
        return new Response(`${error}`, {status: 500} )
    }

}