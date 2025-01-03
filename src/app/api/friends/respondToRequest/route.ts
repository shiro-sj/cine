import { db } from "@/db"
import { friendsOfUser } from "@/db/schema/users"
import { NextResponse } from "next/server"
import { eq } from 'drizzle-orm'

export async function POST(request: Request){
    try{
        const payload = await request.json()
        console.log(payload)
        const response = await db.update(friendsOfUser).set(payload).where(eq(friendsOfUser.id, payload.id))
        if (response){
            return NextResponse.json({message: 'Responded successfully.', payload})

        }
        
    }catch (error){
        return new Response(`Error: ${error}`, {status: 500})
    }
}