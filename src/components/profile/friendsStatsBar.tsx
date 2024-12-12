'use client'
import { FriendsProfileProps, recentEntries, RecentMainProps } from '@/lib/interfaces'
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import axios from 'axios'
import { useEffect, useState } from 'react'

function FriendsStatsBar({username}:FriendsProfileProps) {
    const [stats, setStats] = useState<any>(null);
    useEffect(()=>{
        const fetchData = async () => {
            try{
              const response = await axios.get(`/api/friends/stats?username=${username}`); 
              setStats(response.data)
              console.log(response.data)
            } catch{
            }
          };
        fetchData();
    },[username])

    if (!stats) {
        return <div>Error: Stats could not be loaded.</div>;
    }

  return (
    <div className='h-[30vh] bg-content1 rounded-lg shadow-lg box-border p-4'>
        <div className='h-full w-full justify-around items-center flex flex-row'>
            <div className='flex flex-col justify-center items-center gap-2'>
            <h1>{stats.watchTime[0]?.totalRuntime || 'data unavailable.'}+</h1>
            <h3>minutes watched</h3>
            </div>
            <div className='flex flex-col justify-center items-center gap-2'>
            <h1>{stats.entryCount[0]?.entryCount}</h1>
            <h3>entries</h3>
            </div>
            <div className='flex flex-col justify-center items-center gap-2'>
            <h1>{stats.weekdayEntries[0]?.dayOfWeek || 'data unavailable.'}</h1>
            <h3>most logged day</h3>
            </div>
        </div>
    </div>

    

  )
}

export default FriendsStatsBar