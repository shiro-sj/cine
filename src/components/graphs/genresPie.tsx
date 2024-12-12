import { GenrePieChartProps } from '@/lib/interfaces';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function GenrePieChart({topGenres}: GenrePieChartProps) {

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6347'];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={topGenres}
          dataKey="count"
          nameKey="name"
          cx="50%"  // Centers the pie chart horizontally
          cy="50%"  // Centers the pie chart vertically
          outerRadius="80%"  // Size of the outer radius of the pie chart
          innerRadius="60%"  // Padding to create space in the middle of the pie chart (donut effect)
          paddingAngle={2}   // Adds some space between the slices
          stroke="none"
        >
          {topGenres.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend wrapperStyle={{
            fontSize: '12px', 
          }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default GenrePieChart;
