import { db } from "@/db";  // Assuming this is where your DB instance is
import { friendsOfUser, users } from "@/db/schema/users";
import { currentUser } from "@clerk/nextjs/server";  // Assuming you use Clerk for authentication
import { or, and, eq } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await currentUser();
    
    if (!user) {
      // No user is logged in, return a 401 error
      return NextResponse.json({ error: "No user logged in." }, { status: 401 });
    }

    // Find the user from the database using Clerk's user ID
    const dbUser = await db.select().from(users).where(eq(users.clerkId, user.id));

    if (!dbUser || dbUser.length === 0) {
      // If the user is not found in the database, return a 404 error
      return NextResponse.json({ error: "User not found in the database." }, { status: 404 });
    }

    // Create aliases for the sender and receiver to avoid ambiguity
    const senderAlias = alias(users, "senderAlias");
    const receiverAlias = alias(users, "receiverAlias");

    // Query for confirmed friends and their details
    const confirmedFriends = await db
      .select({
        senderId: friendsOfUser.senderId,
        receiverId: friendsOfUser.receiverId,
        senderUsername: senderAlias.username,
        receiverUsername: receiverAlias.username,
        senderImageUrl: senderAlias.imageUrl, // Include sender's image URL
        receiverImageUrl: receiverAlias.imageUrl, // Include receiver's image URL
      })
      .from(friendsOfUser)
      .where(
        and(
          or(
            eq(friendsOfUser.senderId, dbUser[0].id),
            eq(friendsOfUser.receiverId, dbUser[0].id)
          ),
          eq(friendsOfUser.status, "confirmed")
        )
      )
      .leftJoin(senderAlias, eq(friendsOfUser.senderId, senderAlias.id))
      .leftJoin(receiverAlias, eq(friendsOfUser.receiverId, receiverAlias.id));

    // Map the result to structure the response
    const confirmedFriendsList = confirmedFriends.map((friend) => {
      const isSender = friend.senderId === dbUser[0].id;
      const friendData = isSender ? {
        id: friend.receiverId,
        username: friend.receiverUsername,
        imageUrl: friend.receiverImageUrl || "/default-avatar.png", // Default image URL if missing
      } : {
        id: friend.senderId,
        username: friend.senderUsername,
        imageUrl: friend.senderImageUrl || "/default-avatar.png", // Default image URL if missing
      };
      return friendData;
    });

    // Log the result for debugging
    console.log(confirmedFriendsList);

    // Return the confirmed friends list as JSON
    return NextResponse.json(confirmedFriendsList);

  } catch (error) {
    console.error("Error fetching friends:", error);
    // Handle unexpected errors
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
