'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image'
import { useUser} from '@clerk/nextjs';

export default function Profile({params}) {

    const [profileData, setProfileData] = useState(null);
    const { username } = params;
    const { isSignedIn } = useUser(); // Clerk.js integration


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/api/user?username=${username}`);
        const data = response.data;

        if (response.status === 200) {
          setProfileData(data.currentUser);
        }
      } catch (e) {
        console.log(e);
      }
    };

    if (username) {
      fetchProfile();
    }
  }, [username]);
  
  if (!isSignedIn) {
    return <p>Please sign in to view your profile.</p>;
  }

  return (
    <div>
      <h2>{username}</h2>
      <Image
        src={profileData?.imageUrl} 
        alt="User's profile picture" 
        className="w-24 h-24 rounded-full object-cover"
      />
    </div>
  );
};
