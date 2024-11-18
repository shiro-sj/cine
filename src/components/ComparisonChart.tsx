'use client'
import { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Hardcoded data for comparison between two users
const generateWatchDataComparison = () => {
  return [
    { category: 'Drama', user1WatchCount: 300, user2WatchCount: 250 },
    { category: 'Action & Adventure', user1WatchCount: 450, user2WatchCount: 400 },
    { category: 'Comedy', user1WatchCount: 200, user2WatchCount: 180 },
    { category: 'Science Fiction', user1WatchCount: 350, user2WatchCount: 330 },
    { category: 'Horror', user1WatchCount: 180, user2WatchCount: 150 },
    { category: 'Romance', user1WatchCount: 100, user2WatchCount: 120 },
    { category: 'Fantasy', user1WatchCount: 250, user2WatchCount: 220 },
    { category: 'Documentary', user1WatchCount: 120, user2WatchCount: 110 },
  ];
};

const WatchDataComparisonChart = () => {
  const [watchData, setWatchData] = useState<any[]>([]);

  useEffect(() => {
    const hardcodedData = generateWatchDataComparison();
    setWatchData(hardcodedData);
  }, []);

  return (
    <div className="p-4 w-full h-full">
      <h2 className="text-xl font-semibold mb-4">Compare your data</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={watchData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="user1WatchCount" name="me" fill="#8100d8" />
          <Bar dataKey="user2WatchCount" name="testuser" fill="#8889c0" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WatchDataComparisonChart;
