import { users, entries} from "@/db/schema/users";
import { db } from "@/db"
import { eq, sum, count } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getDayOfWeek, sortByEntriesCount } from "@/lib/helpers";


export async function GET(request: Request){

    try{
        const url = new URL(request.url);
        const username = url.searchParams.get("username");
        

        if (username){

            const dbUser = await db.select().from(users).where(eq(users.username, username))
        
            const watchTime = await db.select({ totalRuntime: sum(entries.runtime)}).from(entries).where(eq(entries.userId, dbUser[0].id))
            const entryCount = await db.select({ entryCount: count(entries.id) }).from(entries).where(eq(entries.userId, dbUser [0].id))
            const dailyStats = await db.select({day: entries.date, entryCount: count(entries.id),})
                .from(entries)
                .where( eq(entries.userId, dbUser[0].id))
                .groupBy(entries.date)
                .orderBy(entries.date);


            const weekdayEntries = dailyStats.reduce((acc: any[], entry: any) => {
                const dayOfWeek = getDayOfWeek(entry.day); 
                const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];

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

            sortByEntriesCount(weekdayEntries);

            return NextResponse.json({
                watchTime:watchTime,
                weekdayEntries: weekdayEntries,
                entryCount: entryCount,
              })
        }else{
        return new Response(`Error finding user.`, {status: 500})
        }
        
    }catch (error){
        return new Response(`${error}`, {status: 500} )
    }

}