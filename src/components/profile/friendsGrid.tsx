'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '@nextui-org/button'
import axios from 'axios'
import { CircularProgress } from '@nextui-org/react'
import { FriendsProfileProps } from '@/lib/interfaces'

function StatGrid({username}: FriendsProfileProps ) {
  const [stats, setStats] = useState<any>(null);  
  const [loading, setLoading] = useState(true);    

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const results = await axios.get(`/api/friends/wrapped/?username=${username}`);
        setStats(results.data);
      } catch (error) {
        console.log(`Error fetching stats: ${error}`);
      } finally {
        setLoading(false);  // Set loading to false once the request is finished (success or failure)
      }
    }
    fetchStats();
  }, []);

  // Show loading spinner or placeholder if data is still loading
  if (loading) {
    return (
      <div className='container-md justify-center items-center'>
        <CircularProgress color="primary" label="loading..." aria-label="Loading..."/>
      </div>
        
    );
  }

  if (!stats) {
    return <div>Error: Stats could not be loaded.</div>;
  }

  return (
    <div className="stats-grid">
      <div className="stats-card-lg">
        <h1 className=''>
          your <span className="underline underline-offset-4">month</span>
          <br />
          wrapped.
        </h1>
      </div>
      <div className="stats-card-md border-r-8 border-content2">
        <h1>{stats.topWatched[0]?.title || 'N/A'}</h1>
        <h3 className='text-foreground-600'>most watched</h3>
      </div>
      <div className="stats-card">
        <h1>{stats.watchTime?.totalRuntime || 'data unavailable.'}</h1>
        <h3 className='text-foreground-600'>total minutes</h3>
      </div>
      <div className="stats-card-profile">
        <div className="flex-1 h-full w-full flex justify-center items-center">
          <Button variant="light" className="h-full w-full">
            <h3>share my stats</h3>
          </Button>
        </div>
      </div>
      <div className="stats-card">
        <h1>{stats.tvLogs.count || 'data unavailable.'}</h1>
        <h3 className='text-foreground-600'>episodes seen</h3>
      </div>
      <div className="stats-card-long border-r-8 border-content2">
        <h1>{stats.topGenres?.[0]?.name || 'data unavailable.'}</h1>
        <h3 className='text-foreground-600'>top genre</h3>
      </div>
      <div className="stats-card">
        <h1>{stats.movieLogs.count || '0'}</h1>
        <h3 className='text-foreground-600'>movies seen</h3>
      </div>
    </div>
  );
}

export default StatGrid;
