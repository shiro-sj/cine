'use client'
import { FriendsProfileProps, recentEntries} from '@/lib/interfaces'
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import axios from 'axios'
import { useEffect, useState } from 'react'

function FriendsRecentsBar({username}:FriendsProfileProps) {
    const [recents, setRecents] = useState<recentEntries[]>([])

    useEffect(()=>{
        const fetchData = async () => {
            try{
              const response = await axios.get(`/api/friends/recents/?username=${username}`); 
              setRecents(response.data)
              console.log(recents)
            } catch{
            }
          };
        
        fetchData()
        
    },[username])
  return (
    <div className="h-[20vh] max-w-full flex gap-4">
    {recents.length>0? (
        <>
        {recents.map((recent)=>
            <div key={recent.tmdbId} className="w-1/4 flex-shrink-0">
            <Card className="max-w-full h-full">
              <CardBody className="scrollbar-hide p-0">
                <div className="w-full max-h-full">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={recent.title}
                    src={recent.backdrop}
                    className="object-cover"
                  />
                </div>  
              </CardBody>
              <CardFooter className="max-w-full ">
                <div className="flex flex-col justify-start items-start text-xs">
                  <b>{recent.title}</b>
                  {/*<p>{recent.date}</p>*/}
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

export default FriendsRecentsBar