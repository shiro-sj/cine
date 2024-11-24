'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Custom function to format the date (only month and day)
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

const WatchStatsChart = () => {
  const [watchStats, setWatchStats] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWatchStats = async () => {
      try {
        const response = await axios.get('/api/stats/watchGraph');
        const data = response.data;

        const formattedData = data.dailyStats.map((entry: { day: string, entryCount: number }) => ({
          watchDate: entry.day,
          watchCount: entry.entryCount
        }));

        setWatchStats(formattedData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchStats();
  }, []);

  // Corrected renderTooltip to access watchCount from the payload
  const renderTooltip = ({ payload, label }: any) => {
    if (!payload || payload.length === 0) return null;

    const { watchCount } = payload[0].payload; // Corrected access to watchCount
    const formattedDate = formatDate(label); // Use the custom formatDate function

    return (
      <div className="custom-tooltip">
        <p className="label">{formattedDate}</p>
        <p className="watch-count">Watch Count: {watchCount}</p>
      </div>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4 w-full h-full">
      <ResponsiveContainer width="100%" height={400} className="text-sm">
        <LineChart data={watchStats}>
          <XAxis 
            dataKey="watchDate" 
            tickFormatter={formatDate}
          />
          <YAxis />
          <Tooltip content={renderTooltip} />
          <Legend />
          <Line type="monotone" dataKey="watchCount" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WatchStatsChart;
