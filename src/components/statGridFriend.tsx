'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '@nextui-org/button'
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import HourglassBottomRoundedIcon from '@mui/icons-material/HourglassBottomRounded'
import axios from 'axios'

function StatGridFriend() {
  const [stats, setStats] = useState<any>(null);  
  const [loading, setLoading] = useState(true);    

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
          testuser's <span className="underline underline-offset-4">month</span>
          <br />
          wrapped.
        </h1>
      </div>
      <div className="stats-card-md">
        <div className="stats-icon">
          <StarRateRoundedIcon fontSize="inherit" />
        </div>
        <h2>Arrested Development</h2>
        <h3>most watched</h3>
      </div>
      <div className="stats-card">
        <div className="stats-icon">
          <HourglassBottomRoundedIcon fontSize="inherit" />
        </div>
        <h2>2,870</h2>
        <h3>total minutes</h3>
      </div>
      <div className="stats-card-profile">
        <div className="flex-1 h-full w-full flex justify-center items-center">
        </div>
      </div>
      <div className="stats-card">
        <div className="stats-icon">
          <VisibilityRoundedIcon fontSize="inherit" />
        </div>
        <h2>190</h2>
        <h3>episodes seen</h3>
      </div>
      <div className="stats-card-long">
        <div className="stats-icon">
          <StarRateRoundedIcon fontSize="inherit" />
        </div>
        <h2>Horror</h2>
        <h3>top genre</h3>
      </div>
      <div className="stats-card">
        <div className="stats-icon">
          <VisibilityRoundedIcon fontSize="inherit" />
        </div>
        <h2>28</h2>
        <h3>movies seen</h3>
      </div>
    </div>
  );
}

export default StatGridFriend;
