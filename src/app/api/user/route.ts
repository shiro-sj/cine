import { db } from '@/db';
import { users } from '@/db/schema/users';
import { eq} from "drizzle-orm";
import { NextResponse } from 'next/server';

export async function GET(request: Request){
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    try{
        if(!username){
            return new Response ('No username provided', {status: 400});
        }
        else{
            console.log('fetching', username)
            const user = await db.select().from(users).where(eq(users.username,  username))

            if (user.length === 0 ){
                return new Response('user not found', {status:404})
            }

            return NextResponse.json(user[0])
        }

    }catch (error) {
        console.error('Error fetching user:', error);
        return new Response(`Error fetching user data: ${error.message}`, { status: 500 });
    }
    
}