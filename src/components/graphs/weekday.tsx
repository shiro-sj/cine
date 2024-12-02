import { BarChart, Bar, XAxis,ResponsiveContainer, LabelList
} from 'recharts';
import { WeekdayEntryGraphProps } from '@/lib/interfaces';

function WatchStatsByWeekdayChart({weekdayEntries}:WeekdayEntryGraphProps){

  return (
    <div className="p-4 w-full h-full">
      <ResponsiveContainer width="100%" height={350} className="text-xs">
        <BarChart data={weekdayEntries} >
        <XAxis dataKey="dayOfWeek" axisLine={false} tickLine={false} dy={10}/>
          <Bar dataKey="entryCount" fill="hsl(240, 50%, 10%)" radius={[10, 10, 10, 10]}>
            <LabelList dataKey="entryCount" position="top" fill="#000" fontSize={12} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WatchStatsByWeekdayChart;
