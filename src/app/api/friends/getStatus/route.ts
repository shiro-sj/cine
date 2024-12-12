import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { friendsOfUser, users } from "@/db/schema/users"; // Import the users schema
import { eq, or } from "drizzle-orm"; // Import the equality function for comparisons

// Helper function to check if a friendship exists between two usernames
async function checkFriendshipExistence(username1: string, username2: string) {
    // Step 1: Get the userIds of the two usernames
    const user1 = await db.select().from(users).where(eq(users.username, username1)).limit(1);
    const user2 = await db.select().from(users).where(eq(users.username, username2)).limit(1);

    if (user1.length === 0 || user2.length === 0) {
        throw new Error('One or both usernames do not exist.');
    }

    const userId1 = user1[0].id;
    const userId2 = user2[0].id;
    console.log(userId1, userId2)

    // Step 2: Query the friendsOfUser table to check if the friendship exists
    const friendship = await db
        .select()
        .from(friendsOfUser)
        .where((t) => or((eq(t.senderId, userId1) && eq(t.receiverId, userId2)),  (eq(t.senderId, userId2) && eq(t.receiverId, userId1))))
        .limit(1);

    // console.log(friendship[0].status)
    if (friendship.length > 0){
        return friendship[0].status
    } 
}

export async function GET(request: Request) {
    try {
        // Step 1: Get the current user
        const user = await currentUser();
        
        if (!user) {
            return NextResponse.json({ error: "No user logged in." }, { status: 401 });
        }

        // Step 2: Get the target username from query parameters (e.g., ?username=someUser)
        const url = new URL(request.url);
        const targetUsername = url.searchParams.get("username");

        if (!targetUsername) {
            return NextResponse.json({ error: "Target username not provided." }, { status: 400 });
        }

        // Step 3: Initialize the friendshipStatus variable to false
        let friendshipStatus;

        // Step 4: Check if the friendship exists between the logged-in user and the target username
        if (user.username) {
            friendshipStatus = await checkFriendshipExistence(user.username, targetUsername);
        }

        // Step 5: Return the friendship status
        return NextResponse.json({ friendship: friendshipStatus });

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: error || "An unexpected error occurred." }, { status: 500 });
    }
}
