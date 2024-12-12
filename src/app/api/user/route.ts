import { db } from "@/db";
import { users } from "@/db/schema/users";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const user = await currentUser();
       
        if (user){
            const dbUser = await db.select().from(users).where(eq(users.clerkId, user.id))
            return NextResponse.json(dbUser)
        }
        
    } catch (error) {
        return NextResponse.json({error: error}, {status: 500}) 
    }
}