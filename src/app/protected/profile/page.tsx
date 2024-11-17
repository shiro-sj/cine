'use client'
import { useUser, UserButton } from '@clerk/nextjs';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image'

export default function Profile() {
  const { isSignedIn, user } = useUser();
  const [profileData, setProfileData] = useState(null);
  const [friendData, setFriendData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/api/user?username=${user?.username}`);
        const data = response.data;

        if (response.status === 200) {
          setProfileData(data.currentUser);
        }
      } catch (e) {
        console.log(e);
      }
    };

    const fetchFriends = async() =>{
      try{
        const response = await axios.get(`/api/friends?username=${user?.username}`)
        const data = response.data;
        
        if(response.status === 200){
          setFriendData(data)
        }
      }catch(e){
        console.log(e)
      }
    }

    if (user) {
      fetchProfile();
    }
  }, [user]);

  if (!isSignedIn) {
    return <p>Please sign in to view your profile.</p>;
  }

  return (
    <div>
      <h2>Welcome, {user.username}</h2>
      <UserButton/>
      <Image
        src={profileData?.imageUrl} 
        alt="User's profile picture" 
        className="w-24 h-24 rounded-full object-cover"
      />
    </div>
  );
};
