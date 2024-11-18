'use client'
import { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Hardcoded data for top watched Netflix genres
const generateTopWatchedGenresData = () => {
  return [
    { genre: 'Horror', watchCount: 550 },
    { genre: 'Thriller', watchCount: 375 },
    { genre: 'Science Fiction', watchCount: 350 },
    { genre: 'Fantasy', watchCount: 320 },
    { genre: 'Action & Adventure', watchCount: 480 },
    { genre: 'Crime', watchCount: 430 },
    { genre: 'Comedy', watchCount: 400 },
    { genre: 'Documentary', watchCount: 270 },
    { genre: 'Drama', watchCount: 250 },
    { genre: 'Romance', watchCount: 300 },
    
  ];
};

const TopWatchedGenresChart = () => {
  const [topWatchedGenres, setTopWatchedGenres] = useState<any[]>([]);

  useEffect(() => {
    const hardcodedData = generateTopWatchedGenresData();
    setTopWatchedGenres(hardcodedData);
  }, []);

  return (
    <div className="p-4 w-full h-full">
      <h2 className="text-xl font-semibold mb-4">Top Watched Netflix Genres</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={topWatchedGenres}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="genre" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="watchCount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopWatchedGenresChart;
