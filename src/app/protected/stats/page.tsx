import WatchStatsByWeekdayChart from '@/components/topWatchedShowChart'
import WatchStatsChart from '@/components/watchStats'
import { Button, ButtonGroup, ScrollShadow } from '@nextui-org/react'
import React from 'react'

function stats() {
  return (
    <div className="h-full w-full flex flex-row gap-2 box-border p-8">
      <div className='basis-4/5 h-full w-full flex flex-col justify-start items-center gap-10'>
      <div>
        <ButtonGroup>
          <Button>Week</Button>
          <Button>Month</Button>
          <Button>Year</Button>
          <Button>All</Button>
        </ButtonGroup>
        
      </div>
        <div className='h-[40vh] w-full flex flex-col items-center gap-10'>
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