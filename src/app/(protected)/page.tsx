'use client'
import { useUser } from '@clerk/nextjs';
import StatGrid from '@/components/home/statGrid';
import Activity from '@/components/home/activities';


function Home() { 
  let avatarSrc;

  const {user, isSignedIn} = useUser();
  if (isSignedIn){
    avatarSrc = user.imageUrl;  
  } else{
    avatarSrc = 'https://media.istockphoto.com/illustrations/blank-man-profile-head-icon-placeholder-illustration-id1298261537?k=20&m=1298261537&s=612x612&w=0&h=8plXnK6Ur3LGqG9s-Xt2ZZfKk6bI0IbzDZrNH9tr9Ok=';
  }

  return (
    <div className='main-div'>
      <div className='container-md'>
        <StatGrid avatarSrc={avatarSrc}/>
      </div>
      <div className='container-md'>
        <Activity/>
      </div>
      <div className='container-md'></div>
    </div>
  )
}

export default Home