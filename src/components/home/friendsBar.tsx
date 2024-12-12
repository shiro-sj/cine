import { FriendsBarProps } from '@/lib/interfaces'
import { Listbox, ListboxItem, Badge, Avatar } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

function FriendsBar({friends}: FriendsBarProps) {
  return (
    <Listbox className="flex flex-col gap-4">
        {friends.map((friend)=>
        <ListboxItem key={friend.id}>
            <Link href={`/protected/profile/${friend.username}`}>
            <div className="flex flex-row justify-start gap-4">
                <Badge content="" color="success" shape="circle" placement="top-right">
                <Avatar src={friend.imageUrl} size="md" radius="md" isBordered color="success"/>
                </Badge>
                <div className="flex items-center justify-center text-center">
                    <p className="flex text-xs font-semibold">{friend.username}</p>
                </div>
            </div>
            </Link>
        </ListboxItem>)}           
    </Listbox>
  )
}

export default FriendsBar