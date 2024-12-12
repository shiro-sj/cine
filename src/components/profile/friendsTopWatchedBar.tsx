'use client'
import { FriendsProfileProps } from '@/lib/interfaces'
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface TopEntry {
    id: number,
    type: string,
    title: string,
    entriesCount: number,
    poster: string,
    backdrop: string
}

function FriendsTopWatchedBar({username}: FriendsProfileProps) {
    const [topWatched, setTopWatched] = useState<TopEntry[]>([])

    useEffect(()=>{
        const fetchData = async () => {
            try{
              const response = await axios.get(`/api/friends/top/?username=${username}`); 
              setTopWatched(response.data.topWatched)
              console.log(response.data.topWatched)
            } catch{
            }
          };
        
        fetchData()

    },[username])
  return (
    <div className="h-[20vh] max-w-full flex gap-4">
    {topWatched.length>0? (
        <>
        {topWatched.map((entry)=>
            <div key={entry.id} className="w-1/4 flex-shrink-0">
            <Card className="max-w-full h-full">
              <CardBody className="scrollbar-hide p-0">
                <div className="w-full max-h-full">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={entry.title}
                    src={entry.backdrop}
                    className="object-cover"
                  />
                </div>  
              </CardBody>
              <CardFooter className="max-w-full ">
                <div className="flex flex-col justify-start items-start text-xs">
                  <b>{entry.title}</b>
                  <p>watched {entry.entriesCount} times</p>
                </div>
              </CardFooter>
            </Card>
          </div>
        )}
        </>

    ):(
        <div className='w-full h-full flex justify-center items-center'>
            <h1>No data available.</h1>

        </div>
        
    )}
    
  </div>
  )
}

export default FriendsTopWatchedBar