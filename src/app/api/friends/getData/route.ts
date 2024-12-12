import { db } from "@/db";
import { users } from "@/db/schema/users";
import { NextResponse } from "next/server";
import { eq } from 'drizzle-orm'

let username: string;


export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const username = url.searchParams.get("username");

        if (!username) {
            return new Response('Username query parameter is required', { status: 400 });
        }

        const friendsData = await db.select({bio: users.bio, id: users.id, email: users.email, imageUrl: users.imageUrl, username: users.username, createdAt: users.createdAt}).from(users).where(eq(users.username, username));

        if (friendsData.length === 0) {
            return new Response('User not found', { status: 404 });
        }

        return NextResponse.json({ friendsData });

    } catch (error) {
        console.error('Error processing GET request:', error);
        return new Response('Error', { status: 500 });
    }
}