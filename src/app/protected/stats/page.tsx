'use client'
import WatchStatsByWeekdayChart from '@/components/graphs/weekday'
import { Button, ButtonGroup, Divider, ScrollShadow } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import FunctionsIcon from '@mui/icons-material/Functions';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import GenrePieChart from '@/components/graphs/genresPie'

function Stats() {
  const [span, setSpan] = useState("Week");
  
  const [topGenres, setTopGenres] = useState<any>([]);
  const [tvGenres, setTvGenres] = useState<any>([]);
  const [movieGenres, setMovieGenres] = useState<any>([]);
  
  const [weekdayEntries, setWeekdayEntries] = useState<any>([]);




  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch(`/api/stats/${span.toLowerCase()}`); 
        const data = await response.json();
        setTopGenres(data.topGenres);
        setWeekdayEntries(data.weekdayEntries)
      } catch{
        
      }
      
    };
    fetchData();
  }, [span]);
  
  return (
    <div className="h-full w-full flex flex-row gap-2 box-border p-8 max-h-screen">
      <div className='basis-4/5 h-full w-full flex flex-col justify-start items-center gap-10'>
      <div>
        <ButtonGroup color='primary' className='shadow-lg'>
          <Button onClick={()=> setSpan("Week")}>Week</Button>
          <Button onClick={()=> setSpan("Month")}>Month</Button>
          <Button onClick={()=> setSpan("Year")}>Year</Button>
          <Button onClick={()=> setSpan("Lifetime")}>Lifetime </Button>
        </ButtonGroup>
      </div>
        <div className='h-full w-full flex flex-col items-center gap-10'>
          <h1 className='font-semibold'>{span}</h1>

          {/* GRAPHS GRID */}
          <div className='flex h-full w-full pb-14'>
            <ScrollShadow hideScrollBar className='h-full w-full'>
              <div className='grid grid-cols-2 w-full h-full gap-6'>
                <div className='h-[50vh] flex flex-col bg-content1 col-span-1 rounded-lg shadow-lg box-border p-4'>
                  <div className='text-3xl flex flex-row justify-start gap-2'>
                    <BubbleChartIcon fontSize='inherit' className='text-primary'/>
                    <h2>TV</h2>
                  </div>
                  <div className='flex flex-col justify-center items-center h-full'>
                    {/* CIRCLE GRAPH */}
                    <div className='basis-2/3 flex justify-center items-center'>
                      Circle Graph

                    </div>
                    {/* LEGENDS */}
                    <div className='basis-1/3 flex justify-center items-center'>
                      Legends

                    </div>

                  </div>
                </div>
                <div className='h-[50vh] flex flex-col bg-content1 col-span-1 rounded-lg shadow-lg box-border p-4'>
                  <div className='text-3xl flex flex-row justify-start gap-2'>
                    <AnalyticsIcon fontSize='inherit' className='text-primary'/>
                    <h2>Film</h2>
                  </div>
                  <div className='w-full flex flex-col justify-center items-center h-full'>
                    {/* CIRCLE GRAPH */}
                    <div className='basis-3/5 w-full flex flex-col justify-end items-start box-border p-4'>
                     <h1 className='text-3xl'>27</h1>
                     <h2>movies watched</h2>
                    </div>
                    {/* LEGENDS */}
                    <div className='basis-2/5 flex flex-row justify-around items-center w-full'>
                      <div className='flex flex-row justify-center items-center gap-2'>
                        <h1>6</h1>
                        <div>
                          <h3>different<br/>countries</h3>
                        </div>
                      </div>
                      <div className='flex flex-row justify-center items-center gap-2'>
                        <h1>4</h1>
                        <div>
                          <h3>different<br/>genres</h3>
                        </div>

                      </div>

                    </div>

                  </div>
                </div>


                <div className='h-[50vh] bg-content1 col-span-2 rounded-lg shadow-lg box-border p-4'>
                  <div className='flex flex-col max-h-full'>
                    <div className='text-3xl flex flex-row gap-2 items-center justify-start'>
                      <LeaderboardIcon fontSize='inherit' className='text-primary'/>
                      <h2>Entries by weekday</h2>
                    </div>
                    <div className='flex'>
                      <WatchStatsByWeekdayChart weekdayEntries={weekdayEntries}/>
                    </div>
                    
                  </div>
                </div>


                <div className='h-[20vh] bg-content1 col-span-1 rounded-lg shadow-lg flex flex-col box-border p-6'>
                  <div className='text-3xl flex flex-row justify-start gap-2'>
                    <FunctionsIcon fontSize='inherit' className='text-primary'/>
                  </div>
                  <div className='flex flex-col-reverse justify-center h-full items-center w-full'>
                    <div className='flex flex-row justify-center items-center gap-2'>
                      <h1 className='text-2xl'>6</h1>
                      <h2>episodes <span className='underline underline-offset-4'>per day</span></h2>
                    </div>
                    <div>
                      <h2>average</h2>
                    </div>
                  </div>
                </div>


                
                <div className='h-[20vh] bg-content1 col-span-1 rounded-lg shadow-lg flex flex-col box-border p-6'>
                  <div className='text-3xl flex flex-row justify-start gap-2'>
                    <FunctionsIcon fontSize='inherit' className='text-primary'/>
                  </div>
                  <div className='flex flex-col-reverse justify-center h-full items-center w-full'>
                    <div className='flex flex-row justify-center items-center gap-2'>
                      <h1 className='text-2xl'>0.33</h1>
                      <h2>movies <span className='underline underline-offset-4'>per day</span></h2>
                    </div>
                    <div>
                      <h2>average</h2>
                    </div>
                  </div>
                </div>

                <div className='h-[30vh] bg-content1 col-span-2 rounded-lg shadow-lg box-border p-4'>
                  <div className='h-full w-full justify-around items-center flex flex-row'>
                    <div className='flex flex-col justify-center items-center gap-2'>
                      <h1>374+</h1>
                      <h3>minutes watched</h3>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2'>
                      <h1>7</h1>
                      <h3>days logged</h3>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2'>
                      <h1>Wednesday</h1>
                      <h3>most logged day</h3>
                    </div>
                  </div>
                </div>
                

                <div className='h-[50vh] box-border p-4 bg-content1 col-span-2 rounded-lg shadow-lg'>
                  <div className='h-full w-full flex flex-row gap-4'>
                    <div className='basis-1/3 h-full w-full flex justify-center items-center rounded-lg'>
                      <h1>Genres</h1>
                    </div>
                    <div className='basis-2/3 h-full w-full flex justify-center rounded-lg'>
                      <GenrePieChart topGenres={topGenres} />
                    </div>

                  </div>
                 
                </div>
              </div>
            </ScrollShadow>

          </div>
          

          
        </div>
      </div>
      <div className='basis-1/5'>

      </div>

      
    </div>
  )
}

export default Stats