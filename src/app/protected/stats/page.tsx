import StatGrid from '@/components/statGrid'
import TopWatchedGenresChart from '@/components/topGenresChart'
import TopWatchedShowsChart from '@/components/topWatchedShowChart'
import WatchStatsChart from '@/components/watchStats'
import React from 'react'

function stats() {
  return (
    <div className='main-div'>
      <div className='container-lg'>
        <WatchStatsChart/>
      </div>
      <div className='container-lg'>
        <div className='content-h'>
          <TopWatchedShowsChart/>
          <TopWatchedGenresChart/>
        </div>
      </div>
      <div className='container-lg'>
        <StatGrid/>
      </div>
    </div>
  )
}

export default stats