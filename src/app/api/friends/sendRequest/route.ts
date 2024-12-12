import { db } from "@/db";
import { friendsOfUser } from "@/db/schema/users";
import { NextResponse } from "next/server"

export async function POST(request: Request){
    try {
        const payload = await request.json();  
        console.log(payload); 
        const sendRequest = await db.insert(friendsOfUser).values(payload)
        if (sendRequest){
            return NextResponse.json({ success: true, payload });
        }
      } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ success: false, message: 'Failed to process request' }, { status: 500 });
      }
}