'use client'
import {useUser} from "@clerk/nextjs"
import ActivityGrid from "@/components/activityGrid"
import StatGrid from "@/components/statGrid"
import Recommended from "@/components/recommended";
import LogBar from "@/components/logbar";


function Home() {
    const {user, isSignedIn} = useUser();
    let avatarSrc;
    let username;

    if (isSignedIn){
        avatarSrc = user.imageUrl;
        username = user.username;
    } else{
        avatarSrc = './default-avatar.png'
        username = 'user'
    }

    return (
      <div className='main-div'>
        <div className='container-lg'>
          <StatGrid/>
        </div>
        <div className="container-xs">
          <LogBar/>
        </div>
        <div className='container-md'>
          <ActivityGrid avatarSrc={avatarSrc} username={username}/>
        </div>
        <div className='container-md'>
          <Recommended/>
        </div>
      </div>
    )
  }
  
  export default Home