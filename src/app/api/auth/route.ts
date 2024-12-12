import { WebhookEvent } from "@clerk/nextjs/server";
import {db} from '@/db';
import { users } from "@/db/schema/users";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {

    const payload = await request.json()
    console.log(payload)
    const evt: WebhookEvent = payload
    const evtType = evt.type;

    if (evtType === 'user.created'){
      const {id, external_id, username, email_addresses, image_url, created_at} = evt.data
      console.log(id, external_id, username, email_addresses[0].email_address, image_url, created_at);

      if (!id || !username || !email_addresses[0].email_address){
        return new Response('Error creating user: Missing data.', {status:400})
      } 
      const newUser = await db.insert(users).values({
        clerkId: id,
        username: username,
        email: email_addresses[0].email_address,
        imageUrl: image_url,
        createdAt: new Date(created_at),
      })

      return NextResponse.json({
        message: 'User created successfully!',
        user: newUser
      })
    } 

    else if (evt.type === 'user.deleted'){
      const {id} = evt.data;
      if (!id){
        return new Response('Cannot find user to delete.', {status: 400})
      }
      const deletedUser = await db.delete(users).where(eq(users.clerkId, id))
      return NextResponse.json({
        message: 'User deleted successfully!',
        deletedUser: deletedUser
      })
    }

    else if (evt.type === 'user.updated'){
      const {id, username, email_addresses, image_url,updated_at} = evt.data
      console.log(id, username, email_addresses[0].email_address, image_url, updated_at);

      if (!id || !username || !email_addresses[0].email_address){
        return new Response('Error creating user: Missing data.', {status:400})
      } 

      const updatedUser = await db.update(users).set({
        clerkId: id,
        username: username,
        email: email_addresses[0].email_address,
        imageUrl: image_url,
        updatedAt: new Date(updated_at),
      }).where(
        eq(users.clerkId, id)
      )

      return NextResponse.json({
        message: 'User updated successfully!',
        user: updatedUser
      })

    }

    
  } catch (error) {
    return new NextResponse(`Webhook error: ${error}`, {
    })
  }
 
 
}

export async function GET(){
  try{
    const result = await db.select().from(users)
    return NextResponse.json({result})
  }catch(error){
    return new Response(`An error occurred while fetching users: ${error}`, { status: 500 })
  }
}