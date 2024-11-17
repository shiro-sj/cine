'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '@nextui-org/button'
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import HourglassBottomRoundedIcon from '@mui/icons-material/HourglassBottomRounded'
import axios from 'axios'

function StatGrid() {
  const [stats, setStats] = useState<any>(null);  // Initialize as null
  const [loading, setLoading] = useState(true);    // Loading state is true by default

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const results = await axios.get('/api/stats/wrapped');
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
      <div className="loading-spinner">
        <h3>Loading your stats...</h3>
        {/* Add a loading spinner (you can use any library or custom spinner) */}
        <div className="spinner">Loading...</div>
      </div>
    );
  }

  if (!stats) {
    return <div>Error: Stats could not be loaded.</div>;
  }

  return (
    <div className="stats-grid">
      <div className="stats-card-lg">
        <h1>
          your <span className="underline underline-offset-4">month</span>
          <br />
          wrapped.
        </h1>
      </div>
      <div className="stats-card-md">
        <div className="stats-icon">
          <StarRateRoundedIcon fontSize="inherit" />
        </div>
        <h2>{stats.topWatched[0]?.title || 'N/A'}</h2>
        <h3>most watched</h3>
      </div>
      <div className="stats-card">
        <div className="stats-icon">
          <HourglassBottomRoundedIcon fontSize="inherit" />
        </div>
        <h2>{stats.watchTime?.totalRuntime || 'data unavailable.'}</h2>
        <h3>total minutes</h3>
      </div>
      <div className="stats-card-profile">
        <div className="flex-1 h-full w-full flex justify-center items-center">
          <Button variant="light" className="h-full w-full">
            <h3>share my stats</h3>
          </Button>
        </div>
      </div>
      <div className="stats-card">
        <div className="stats-icon">
          <VisibilityRoundedIcon fontSize="inherit" />
        </div>
        <h2>{stats.tvLogs.count || 'data unavailable.'}</h2>
        <h3>episodes seen</h3>
      </div>
      <div className="stats-card-long">
        <div className="stats-icon">
          <StarRateRoundedIcon fontSize="inherit" />
        </div>
        <h2>{stats.topGenres?.[0]?.name || 'data unavailable.'}</h2>
        <h3>top genre</h3>
      </div>
      <div className="stats-card">
        <div className="stats-icon">
          <VisibilityRoundedIcon fontSize="inherit" />
        </div>
        <h2>{stats.movieLogs.count || 'data unavailable.'}</h2>
        <h3>movies seen</h3>
      </div>
    </div>
  );
}

export default StatGrid;
