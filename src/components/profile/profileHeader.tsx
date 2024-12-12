'use client'
import { Avatar} from '@nextui-org/react';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { User } from '@/lib/interfaces';

function ProfileHeader() {
    
    const [data, setData] = useState<User>();

    useEffect(()=>{

        const fetchUser = async () => {
            try {
                const response = await axios.get(`/api/user`)
                setData(response.data[0])
            } catch (error) {
                console.log(error)
                
            }
        }
        fetchUser();
    },[])

  return (
    <div className="max-w-full h-full flex flex-col">
        <div className="relative w-full h-[35vh]">
            <div className="absolute w-full h-[20vh] bg-purpledark "></div>
            <div className="absolute top-1/2 left-10 border-4 border-white rounded-full overflow-hidden">
                <Avatar
                src={data?.imageUrl}
                className="w-32 h-32 shadow-xl"
                alt={data?.username}
                />
            </div>
            <div className='absolute top-2/3 left-48 flex flex-col'>
                <h1 className='text-2xl'>{data?.username}</h1>
                <p>@{data?.username}</p>
            </div>
        <div className="absolute top-2/3 right-[2vw]">
        <div className='flex flex-row gap-16'>
                <div className="flex justify-end space-x-8 mt-6 text-gray-600">
                    <div className="text-center">
                        <h3 className="font-semibold">1</h3>
                        <p>Friends</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
  )
}

export default ProfileHeader