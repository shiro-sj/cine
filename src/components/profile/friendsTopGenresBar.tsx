'use client'
import { FriendsProfileProps, Genre } from '@/lib/interfaces'
import { Card, CardBody, CardFooter} from '@nextui-org/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'


function FriendsTopGenresBar({username}: FriendsProfileProps) {
    const [topGenres, setTopGenres] = useState<Genre[]>([])

    useEffect(()=>{
        const fetchData = async () => {
            try{
              const response = await axios.get(`/api/friends/top/?username=${username}`); 
              setTopGenres(response.data.topGenres)
              console.log(response.data.topGenres)
            } catch{
            }
          };
        
        fetchData()

    },[username])

  return (
    <div className="h-[15vh] max-w-full flex gap-4">
    {topGenres.length>0? (
        <>
        {topGenres.map((genre) => (
          <div key={genre.genreId} className="w-1/4 flex-shrink-0">
            <Card className="max-w-full h-full">
              <CardBody className="scrollbar-hide p-0 flex justify-center items-center text-center h-full">
                <h1 className="text-lg">{genre.name}</h1>
                <p>{genre.type}</p>
              </CardBody>
              <CardFooter className="max-w-full flex justify-center items-center text-center">
                <p className='w-full flex justify-center items-center text-center text-xs'>
                  watched {genre.count} times
                </p>
              </CardFooter>
            </Card>
          </div>
        ))}
      </>

    ):(
        <div className='w-full h-full flex justify-center items-center'>
            <h1>No data available.</h1>

        </div>
        
    )}
    
  </div>
  )
}

export default FriendsTopGenresBar