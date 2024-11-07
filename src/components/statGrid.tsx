import React from 'react'
import Link from 'next/link'
import { Button} from '@nextui-org/button'
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import HourglassBottomRoundedIcon from '@mui/icons-material/HourglassBottomRounded';
import { Avatar } from '@nextui-org/avatar'
import { AvatarImageProps } from '@/lib/interfaces';

function StatGrid({avatarSrc}: AvatarImageProps) {
  return (
    <div className='stats-grid'>
      <div className='stats-card-lg'>
        <h1>your <span className='underline underline-offset-4'>month</span><br/>wrapped.</h1>
      </div>
      <div className='stats-card-md'>
        <div className='stats-icon'>
          <StarRateRoundedIcon fontSize='inherit'/> 
        </div>
        <h2>bojack horseman</h2>
        <h3>most watched</h3>
      </div>
      <div className='stats-card'>
        <div className='stats-icon'>
          <HourglassBottomRoundedIcon fontSize='inherit'/>
        </div>
        <h2>1,590</h2>
        <h3>total minutes</h3>
      </div>
      <div className='stats-card-profile'>
        <Link href='/profile' className='flex-1 flex justify-center items-center'>
          <Avatar src={avatarSrc} className='h-32 w-32' isBordered color='primary'/>
        </Link>
        <div className='flex-1 h-full w-full flex justify-center items-center'>
          <Button variant='light' className='h-full w-full'>
            <h3>share my stats</h3>
          </Button>
        </div>
      </div>
      <div className='stats-card'>
        <div className='stats-icon'>
          <VisibilityRoundedIcon fontSize='inherit'/>
        </div>
        <h2>36</h2>
        <h3>episodes seen</h3>
      </div>
      <div className='stats-card-long'>
        <div className='stats-icon'>
          <StarRateRoundedIcon fontSize='inherit'/>
        </div>
        <h2>horror</h2>
        <h3>top genre</h3>
      </div>
      <div className='stats-card'>
        <div className='stats-icon'>
          <VisibilityRoundedIcon fontSize='inherit'/>
        </div>
        <h2>6</h2>
        <h3>movies seen</h3>
      </div>
    </div>
  )
}

export default StatGrid