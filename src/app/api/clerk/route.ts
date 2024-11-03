import { prisma } from '@/lib/prisma';
import { WebhookEvent } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Processing the request and payload
    const payload: WebhookEvent = await request.json();
    console.log(payload);

    const evt: WebhookEvent = payload;
    const eventType = evt.type;

    // Creating a new user
    if (eventType === 'user.created') {
      const { id, email_addresses, username, image_url, created_at} = evt.data;
      if (!id || !email_addresses || !email_addresses[0]?.email_address) {
        return new Response('Error occurred -- missing data.', { status: 400 });
      }

      // Create the user on Prisma
      const newUser = await prisma.user.create({
        data: {
          clerkId: id as string,
          username: username as string,
          email: email_addresses[0].email_address,
          profileImage: image_url as string,
          createdAt:  new Date(created_at),
        },
      });

      return NextResponse.json({
        message: 'User created successfully',
        user: newUser,
      });
    }

    // Deleting a user
    if (eventType === 'user.deleted') {
      const { id } = evt.data;

      const existingUser = await prisma.user.findUnique({
        where: { clerkId: id },
      });

      if (!existingUser) {
        return new Response('User does not exist.', { status: 404 });
      }

      const deleteUser = await prisma.user.delete({
        where: { clerkId: id },
      });

      if (!deleteUser) {
        return new Response('Error occurred -- user does not exist.', { status: 500 });
      }

      return new Response(JSON.stringify({ message: 'User deleted successfully.' }));
    }

    // Updating a user
    if (eventType === 'user.updated') {
      const { id, username, email_addresses } = evt.data;

      const existingUser = await prisma.user.findUnique({
        where: { clerkId: id },
      });

      if (!existingUser) {
        return new Response('User does not exist.', { status: 404 });
      }

      const updatedUser = await prisma.user.update({
        where: { clerkId: id },
        data: {
          username: username as string,
          email: email_addresses[0].email_address,
        },
      });

      if (!updatedUser) {
        return new Response('Error occurred -- no changes made.', { status: 500 });
      }

      return NextResponse.json({ message: 'User updated successfully.', user: updatedUser });
    }
  } catch (e) {
    console.error('Something went wrong:', e);
    return new Response('An error occurred while processing the request.', { status: 500 });
  }
}

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({ users });
  } catch (e) {
    console.error('Error fetching users:', e);
    return new Response('An error occurred while fetching users.', { status: 500 });
  }
}
