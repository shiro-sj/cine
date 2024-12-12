import { db } from '@/db';
import { entries, users } from '@/db/schema/users';
import { eq, gte, and, desc} from "drizzle-orm";
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET(){
    
    try{
        const user = await currentUser()
        //const limit = ;
        const setback = 1;

        if(user){
            const comparisonDate = new Date();
            comparisonDate.setMonth(comparisonDate.getMonth() - setback);

            const dbUser = await db.select().from(users).where(eq(users.clerkId, user.id))
            const results = await db.select({id: entries.id, type: entries.type, title: entries.title, tmdbId: entries.tmdbId, date: entries.date, season: entries.season, episode: entries.episode}).from(entries).where(and(eq(entries.userId, dbUser[0].id), gte(entries.date, comparisonDate) )).orderBy(desc(entries.date))

            return NextResponse.json(results)
        }else {
            return new Response('User not authenticated', { status: 401 });
        }

    }catch(error){
        return new Response(`Error: ${error}`, {status: 401})
    }
    
}