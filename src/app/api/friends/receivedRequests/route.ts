import { db } from "@/db";
import { friendsOfUser, users } from "@/db/schema/users";
import { currentUser } from "@clerk/nextjs/server";
import { eq, and, or, ne } from "drizzle-orm"; // Added `ne` for "not equal"
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const user = await currentUser();
        if (user) {
            // Fetch the user from the database using Clerk ID
            const dbUser = await db
                .select()
                .from(users)
                .where(eq(users.clerkId, user.id));

            if (!dbUser.length) {
                return new Response("User not found in database", { status: 404 });
            }

            const userId = dbUser[0].id;

            // Received friend requests
            const receivedRequests = await db
                .select()
                .from(friendsOfUser)
                .where(
                    and(
                        eq(friendsOfUser.receiverId, userId),
                        eq(friendsOfUser.status, "pending")
                    )
                );

            // Sent friend requests
            const sentRequests = await db
                .select({
                    id: friendsOfUser.id,
                    userId: users.id,
                    username: users.username,
                    profileImage: users.imageUrl,
                    status: friendsOfUser.status,
                })
                .from(users)
                .leftJoin(
                    friendsOfUser,
                    eq(friendsOfUser.senderId, users.id)
                )
                .where(
                    and(
                        eq(friendsOfUser.status, "pending"),
                        eq(users.id, userId)
                    )
                )
                .groupBy(
                    friendsOfUser.id,
                    users.id,
                    friendsOfUser.status
                );

            // Fetch friends (bidirectional) excluding the current user
            const friends = await db
                .select({
                    friendId: users.id,
                    username: users.username,
                    profileImage: users.imageUrl,
                })
                .from(users)
                .leftJoin(
                    friendsOfUser,
                    or(
                        eq(friendsOfUser.senderId, users.id),
                        eq(friendsOfUser.receiverId, users.id)
                    )
                )
                .where(
                    and(
                        or(
                            eq(friendsOfUser.senderId, userId),
                            eq(friendsOfUser.receiverId, userId)
                        ),
                        eq(friendsOfUser.status, "confirmed"),
                        ne(users.id, userId) // Exclude current user
                    )
                );

            // Return all data
            return NextResponse.json({
                requests: receivedRequests,
                friends: friends,
                sentRequests: sentRequests,
            });
        } else {
            return new Response("User not authenticated", { status: 401 });
        }
    } catch (error) {
        return new Response(`Error fetching requests: ${error.message}`, {
            status: 500,
        });
    }
}
