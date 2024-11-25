import { db } from "@/db";
import { users } from "@/db/schema/users";
import { NextResponse } from "next/server";
import { eq } from 'drizzle-orm'

let username: string;

export async function POST(request: Request){
    try{
        const payload = await request.json()
        console.log(payload)
        username = payload.username;
        return NextResponse.json({payload})

    }catch (error){
        return new Response('Error', {status: 500})

    }
}


export async function GET(){
    try{
        const friendsData = await db.select().from(users).where(eq(users.username, username))
        return NextResponse.json({friendsData})

    }catch (Error){
        return new Response('Error', {status: 500})
    }

}