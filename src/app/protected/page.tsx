'use client'
import {useUser} from "@clerk/nextjs"
import ActivityGrid from "@/components/activityGrid"
import StatGrid from "@/components/statGrid"


function Home() {
    const {user, isSignedIn} = useUser();
    let avatarSrc;

    if (isSignedIn){
        avatarSrc = user.imageUrl;
    } else{
        avatarSrc = './default-avatar.png'
    }

    return (
      <div className='main-div'>
        <div className='container-md'>
          <StatGrid avatarSrc={avatarSrc}/>
        </div>
        <div className='container-md'>
          <ActivityGrid/>
        </div>
        <div className='container-md'></div>
      </div>
    )
  }
  
  export default Home