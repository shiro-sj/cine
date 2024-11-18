import { db } from "@/db";
import { entries, users, friendsOfUser } from "@/db/schema/users";
import { NextResponse } from "next/server";
import {eq, ne, and, isNull} from 'drizzle-orm'
import { currentUser } from "@clerk/nextjs/server";

export async function GET(){
    try{
        const clerkUser = await currentUser()
        if (clerkUser){
            const dbUser = await db.select().from(users).where(eq(users.clerkId, clerkUser.id))
            const usersList = await db.select({userId: users.id, username: users.username, profileImage: users.imageUrl, status: friendsOfUser.status}).from(users).leftJoin(friendsOfUser, eq(friendsOfUser.senderId, users.id)).where( eq(users.id, dbUser[0].id)).groupBy(users.id, friendsOfUser.status)
           
            return NextResponse.json({currentUser: dbUser[0], usersList})

           
        } else{
            return new Response('No logged user.', {status: 500})
            
        }

       

    }catch (error){
        return new Response(`Error fetching users: ${error}`, {status: 500})
    }
}