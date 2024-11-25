import FriendsList from '@/components/friendsList'
import RecentsBar from '@/components/recentsBar'
import SearchUser from '@/components/userSearch'
import React from 'react'

function Profile() {
  return (
    <div className='main-div'>
      <div className='container-xs'>
        <SearchUser/>
      </div>
      <div className='container-sm'>
        <FriendsList/>
      </div>
      <div className='container-lg'>
        <RecentsBar/>
      </div>
      
    </div>
  )
}

export default Profile