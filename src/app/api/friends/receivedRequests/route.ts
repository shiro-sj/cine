import { db } from "@/db"
import { friendsOfUser, users } from "@/db/schema/users"
import { currentUser } from "@clerk/nextjs/server"
import { eq, and } from 'drizzle-orm'
import { NextResponse } from "next/server"

export async function GET(){
    try{
        const user = await currentUser()
        if (user){
            const dbUser = await db.select().from(users).where(eq(users.clerkId, user.id));
            const receivedRequests = await db.select().from(friendsOfUser).where(and(eq(friendsOfUser.receiverId, dbUser[0].id), eq(friendsOfUser.status, 'pending')))
            const sentRequests = await db.select({id: friendsOfUser.id, userId: users.id, username: users.username, profileImage: users.imageUrl, status: friendsOfUser.status}).from(users).leftJoin(friendsOfUser, eq(friendsOfUser.senderId, users.id)).where(and(eq(friendsOfUser.status, 'pending'), eq(users.id, dbUser[0].id))).groupBy(friendsOfUser.id, users.id, friendsOfUser.status)
            const friends = await db.select().from(friendsOfUser).where(and(eq(friendsOfUser.receiverId, dbUser[0].id), eq(friendsOfUser.status, 'confirmed')))
            return NextResponse.json({requests: receivedRequests, friends: friends, sentRequests: sentRequests})
        }
    } catch (error){
        return new Response(`Error fetching requests: ${error}`, {status: 500})
    }
}