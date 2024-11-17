import {db} from '@/db'
// import {friends, users} from '@/db/schema/users';
import {eq,or,and} from 'drizzle-orm'
import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';

export async function GET(request : Request){
    try{
        const url = new URL(request.url);
        const username = url.searchParams.get('username');
        const user = await currentUser();

        if (!user){
            return new Response('No user provided')
        }

        const sentRequests = await db
        .select()
        .from(FriendRequests)
        .where(eq(senderUserName,username))

        const recievedRequests = await db
        .select()
        .from(FriendRequests)
        .where(eq(receiverUserName,username))

        const friends = await db
        .select()
        .from(Friend)
        .where(eq(username, username))

        return NextResponse.json({sentRequests : sentRequests , recievedRequests:recievedRequests , friends: friends},{status:200})
    }catch(e){
        return new Response(`Error getting requests ${e}`, {status: 500})
    }
}

export async function POST(request: Request) {
    const { action, username, friendUsername } = await request.json();

    // Validate inputs
    if (!username || typeof username !== 'string' || username.trim() === '') {
        return new Response("Invalid username", { status: 400 });
    }
    if (!friendUsername || typeof friendUsername !== 'string' || friendUsername.trim() === '') {
        return new Response("Invalid friend username", { status: 400 });
    }

    try {
        switch (action) {
            case 'sendRequest': {
                // Check if the friend request already exists
                const existingRequest = await db.select(FriendRequests).where(
                    or(
                        and(
                            eq(FriendRequests.senderUserName, username),
                            eq(FriendRequests.receiverUserName, friendUsername)
                        ),
                        and(
                            eq(FriendRequests.senderUserName, friendUsername),
                            eq(FriendRequests.receiverUserName, username)
                        )
                    )
                );

                if (existingRequest.length > 0) {
                    return new Response("Friend request already exists.", { status: 400 });
                }

                // Check if users are already friends
                const existingFriendship = await db.select(Friend).where(
                    or(
                        and(
                            eq(Friend.username, username),
                            eq(Friend.friendname, friendUsername)
                        ),
                        and(
                            eq(Friend.username, friendUsername),
                            eq(Friend.friendname, username)
                        )
                    )
                );

                if (existingFriendship.length > 0) {
                    return new Response("You are already friends.", { status: 400 });
                }SS

                // Insert new friend request
                await db.insert(FriendRequests).values({
                    senderUserName: username,
                    receiverUserName: friendUsername
                });

                return new Response("Friend Request Sent", { status: 200 });
            }

            case 'S': {
                // Delete the friend relationship
                await db.delete(Friend).where(
                    or(
                        and(eq(Friend.username, username), eq(Friend.friendname, friendUsername)),
                        and(eq(Friend.username, friendUsername), eq(Friend.friendname, username))
                    )
                );

                return new Response("Friend Deleted", { status: 200 });
            }

            case 'acceptRequest': {
                // Add friends for both users
                await db.transaction(async (trx) => {
                    await trx.insert(Friend).values([
                        { username, friendname: friendUsername },
                        { username: friendUsername, friendname: username }
                    ]);

                    // Remove the friend request
                    await trx.delete(FriendRequests).where(
                        and(eq(FriendRequests.receiverUserName, username), eq(FriendRequests.senderUserName, friendUsername))
                    );
                });

                return new Response("Friend Request Accepted", { status: 200 });
            }

            case 'declineRequest': {
                // Decline the friend request
                await db.delete(FriendRequests).where(
                    and(eq(FriendRequests.receiverUserName, username), eq(FriendRequests.senderUserName, friendUsername))
                );

                return new Response("Friend Request Declined", { status: 200 });
            }

            case 'deleteRequest': {
                // Delete a friend request sent by the current user
                await db.delete(FriendRequests).where(
                    and(eq(FriendRequests.senderUserName, username), eq(FriendRequests.receiverUserName, friendUsername))
                );

                return new Response("Friend Request Deleted", { status: 200 });
            }

            default:
                return new Response("Invalid action", { status: 400 });
        }
    } catch (error) {
        console.error("Error handling friend request:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
