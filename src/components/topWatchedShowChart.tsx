'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { CircularProgress } from '@nextui-org/react';

// The component for the bar chart
const WatchStatsByWeekdayChart = () => {
  const [weeklyStats, setWeeklyStats] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWatchStats = async () => {
      try {
        const response = await axios.get('/api/stats/watchGraph');
        const data = response.data;

        setWeeklyStats(data.weeklyStats);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchStats();
  }, []);

  if (loading) {
    return <CircularProgress color="default" label="loading..." aria-label="Loading..."/>
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4 w-full h-full">
      <ResponsiveContainer width="100%" height={400} className="text-xs">
        <BarChart data={weeklyStats} >
        <XAxis dataKey="dayOfWeek" axisLine={false} tickLine={false} dy={10}/>
          <Tooltip />
          <Bar dataKey="entryCount" fill="hsl(240, 50%, 10%)" radius={[10, 10, 10, 10]} isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WatchStatsByWeekdayChart;
