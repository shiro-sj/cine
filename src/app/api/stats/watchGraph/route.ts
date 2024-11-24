import { db } from "@/db";
import { entries, users } from "@/db/schema/users";
import { currentUser } from "@clerk/nextjs/server"
import { count, eq, and, gte, sum } from "drizzle-orm";
import { NextResponse } from "next/server";

// Function to get day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
const getDayOfWeek = (date: string) => {
  const day = new Date(date).getDay(); // 0 - Sunday, 1 - Monday, ..., 6 - Saturday
  return day;
}

export async function GET() {
  try {
    const user = await currentUser();
    const setback = 1; // Setback period in months

    if (user) {
      const comparisonDate = new Date();
      comparisonDate.setMonth(comparisonDate.getMonth() - setback);

      const dbUser = await db.select().from(users).where(eq(users.clerkId, user.id));

      // Get daily stats (entries per day in the last month)
      const dailyStats = await db
        .select({
          day: entries.date,
          entryCount: count(entries.id),
        })
        .from(entries)
        .where(and(gte(entries.date, comparisonDate), eq(entries.userId, dbUser[0].id)))
        .groupBy(entries.date)
        .orderBy(entries.date);

      // Calculate watch count by day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
      const weeklyStats = dailyStats.reduce((acc: any[], entry: any) => {
        const dayOfWeek = getDayOfWeek(entry.day); // Get day of week (0-6)
        const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayOfWeek]; // Convert to day name

        const existingDay = acc.find((item) => item.dayOfWeek === dayName);
        
        if (existingDay) {
          existingDay.entryCount += entry.entryCount; // Aggregate count for that day of the week
        } else {
          acc.push({
            dayOfWeek: dayName,
            entryCount: entry.entryCount,
          });
        }
        
        return acc;
      }, []);

      return NextResponse.json({ dailyStats, weeklyStats });
    } else {
      return new Response(`Error finding user.`, { status: 500 });
    }
  } catch (error) {
    return new Response(`${error}`, { status: 500 });
  }
}
