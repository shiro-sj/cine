'use client'
import { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Function to generate a random number between min and max
const getRandomWatchCount = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate hardcoded data for the last 30 days
const generateHardcodedData = () => {
  const data = [];
  const today = new Date();

  // Generate data for the last 30 days
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);  // Subtract i days from today
    const formattedDate = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    const watchCount = getRandomWatchCount(1, 10); // Random watch count between 1 and 10
    data.push({ watchDate: formattedDate, watchCount });
  }

  return data.reverse();  // Reverse the array so that the latest date is first
};

const WatchStatsChart = () => {
  const [watchStats, setWatchStats] = useState<any[]>([]);

  useEffect(() => {
    const hardcodedData = generateHardcodedData();
    setWatchStats(hardcodedData);
  }, []);

  return (
    <div className="p-4 w-full h-full">
      <h2 className="text-xl font-semibold mb-4">Watch Date Stats - Last Month</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={watchStats}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="watchDate" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="watchCount" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WatchStatsChart;
