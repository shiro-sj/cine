import { db } from "@/db";
import { entries, users } from "@/db/schema/users";
import { currentUser } from "@clerk/nextjs/server"
import { count, eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        const user = await currentUser();

        if (user){
            const dbUser = await db.select().from(users).where(eq(users.clerkId, user.id))
            const tvLogs = await db.select({ count: count(entries.id)}).from(entries).where(and(eq(entries.type, 'tv'), eq(entries.userId, dbUser[0].id)))
            const movieLogs = await db.select({ count: count(entries.id)}).from(entries).where(and(eq(entries.type, 'movie'), eq(entries.userId, dbUser[0].id)))
            // const tvWatchTime;
            // const movieWatchTime;
            // const totalWatchTime;

            return NextResponse.json({tv: tvLogs[0], movie: movieLogs[0]})
        }else{
        return new Response(`Error finding user.`, {status: 500})
        }
        
    }catch (error){
        return new Response(`${error}`, {status: 500} )
    }
}