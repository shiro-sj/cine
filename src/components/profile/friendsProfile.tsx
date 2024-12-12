'use client'
import { Avatar, Button } from '@nextui-org/react';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { User } from '@/lib/interfaces';

interface FriendsProfileProps {
    username: string
}

function FriendsProfile({username}: FriendsProfileProps) {
    const [status, setStatus] = useState('');
    const [friendData, setFriendData] = useState<User>();

    useEffect(()=>{
        const fetchStatus = async () => {
            try {
              const response = await axios.get(`/api/friends/getStatus?username=${username}`); 
              //console.log(response.data.friendship)
              setStatus(response.data.friendship)
            } catch (error) {
            
            }
        }

        const fetchFriend = async () => {
            try {
                const response = await axios.get(`/api/friends/getData?username=${username}`)
                setFriendData(response.data.friendsData[0])
            } catch (error) {
                
            }
        }

        fetchStatus();
        fetchFriend();

       
    },[username])
  return (
    <div className="max-w-full h-full flex flex-col">
        <div className="relative w-full h-[35vh]">
            <div className="absolute w-full h-[20vh] bg-purpledark "></div>
            <div className="absolute top-1/2 left-10 border-4 border-white rounded-full overflow-hidden">
                <Avatar
                src={friendData?.imageUrl}
                className="w-32 h-32 shadow-xl"
                alt={friendData?.username}
                />
            </div>
            <div className='absolute top-2/3 left-48 flex flex-col'>
                <h1 className='text-2xl'>{friendData?.username}</h1>
                <p>@{friendData?.username}</p>
            </div>
        <div className="absolute top-2/3 right-[2vw]">
        <div className='flex flex-row gap-16'>
                <div className="flex justify-end space-x-8 mt-6 text-gray-600">
                    <div className="text-center">
                        <h3 className="font-semibold">1</h3>
                        <p>Friends</p>
                    </div>
                </div>
                
                <div className="w-full flex justify-end mt-8 space-x-4">
                {status === "confirmed"? (
                    <>
                    <Button variant="flat" color="primary">
                    Message
                    </Button>
                    <Button variant="flat" color="secondary">
                        Friends
                    </Button>
                    </>

                ):(
                    <>
                    <Button variant="flat" color="primary">
                    Message
                    </Button>
                    <Button variant="flat" color="secondary">
                        Follow
                    </Button>
                    </>
                )}
            </div>
            </div>
        </div>
    </div>
  </div>
  )
}

export default FriendsProfile