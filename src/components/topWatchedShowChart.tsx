'use client'
import { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Hardcoded data for top watched Netflix shows
const generateTopWatchedShowsData = () => {
  return [
    { showName: 'Stranger Things', watchCount: 315 },
    { showName: 'The Crown', watchCount: 180 },
    { showName: 'Bridgerton', watchCount: 160 },
    { showName: 'The Witcher', watchCount: 250 },
    { showName: 'Money Heist', watchCount: 230 },
    { showName: 'Ozark', watchCount: 150 },
    { showName: 'Narcos', watchCount: 140 },
    { showName: 'The Queen\'s Gambit', watchCount: 145 },
    { showName: 'Lucifer', watchCount: 130 },
    { showName: 'You', watchCount: 120 },
  ];
};

const TopWatchedShowsChart = () => {
  const [topWatchedShows, setTopWatchedShows] = useState<any[]>([]);

  useEffect(() => {
    const hardcodedData = generateTopWatchedShowsData();
    setTopWatchedShows(hardcodedData);
  }, []);

  return (
    <div className="p-4 w-full h-full">
      <h2 className="text-xl font-semibold mb-4">Top Watched Netflix Shows</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={topWatchedShows}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="showName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="watchCount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopWatchedShowsChart;
