import FriendsList from '@/components/friendsList'
import ProfileHeader from '@/components/profile/profileHeader'
import SearchUser from '@/components/profile/userSearch'
import RecentsTable from '@/components/recentsTable'
import { ScrollShadow } from '@nextui-org/react'
import React from 'react'

function Profile() {
  return (
    <div className='min-h-[95vh] flex flex-col gap-10 box-border p-10'>
      <ScrollShadow className='h-[90vh] scrollbar-hide'>
        <div className='w-full'>
          <ProfileHeader/>

        </div>
        <div className='container-sm flex flex-row'>
          <div className='flex-1 flex justify-start items-center'>
            <FriendsList/>
          </div>
          
          <div className='flex-1 flex justify-center items-start'>
            <SearchUser/>
          </div>
          
        </div>
        <div className='container-lg'>
          <RecentsTable/>
        </div>
      </ScrollShadow>
    </div>
  )
}

export default Profile