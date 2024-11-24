import WatchStatsByWeekdayChart from '@/components/topWatchedShowChart'
import WatchStatsChart from '@/components/watchStats'
import { ScrollShadow } from '@nextui-org/react'
import React from 'react'

function stats() {
  return (
    <div className="h-full w-full flex flex-row gap-2 box-border p-8">
      <div className='basis-4/5 flex flex-col justify-center items-center gap-10'>
        <div className='h-[40vh] w-full flex flex-col justify-center items-center gap-10'>
        <h1 className='font-semibold'>This month</h1>
          <div className='flex h-full w-full flex-row justify-center items-center gap-10 box-border p-6 '>
            <WatchStatsChart/>
            <WatchStatsByWeekdayChart/>
          </div>
        </div>
      </div>
      <div className='basis-1/5'>

      </div>

      
    </div>
  )
}

export default stats