import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { entries, entriesOnGenre, genres, users } from "@/db/schema/users";
import { eq, count, desc, countDistinct } from 'drizzle-orm'
import { NextResponse } from "next/server";

export async function GET(){
        
    try{
        const user = await currentUser();

        if (user){
            
            const dbUser = await db.select().from(users).where(eq(users.clerkId, user.id))
            const topWatched = await db.select({ title: entries.title, entriesCount: countDistinct(entries.id) }).from(entries).leftJoin(users, eq(entries.userId, dbUser[0].id)).groupBy(entries.tmdbId, entries.title).orderBy(desc(count(entries.id)));
            const topGenres = await db.select({genreId: entriesOnGenre.genreId, name: genres.name, count: count(entriesOnGenre.id) }).from(entriesOnGenre).leftJoin(genres, eq(entriesOnGenre.genreId, genres.id)).where(eq(entriesOnGenre.userId, dbUser[0].id)).groupBy(entriesOnGenre.genreId, genres.name).orderBy(desc(count(entriesOnGenre.id)));
            return NextResponse.json({topWatched: topWatched, topGenres: topGenres})
        } else{
            return new Response('error processing top watched', {status: 500})
        }

    }catch (error){
        return new Response(`Error processing statistics: ${error}`, {status: 500})
    }
}