'use client'
import { useUser, UserButton } from '@clerk/nextjs';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image'
import { profile } from 'console';

export default function Profile() {
  const { isSignedIn, user } = useUser();
  const [profileData, setProfileData] = useState(null);
  const [friendData, setFriendData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      console.log('fetching profile');
      try {
        const response = await axios.get(`/api/user?username=${user?.username}`);
        const data = response.data;

        if (response.status === 200) {
          console.log(response)
          setProfileData(data);

          console.log(profileData)
        }
      } catch (e) {
        console.log(e);
      }
    };

    const fetchFriends = async () => {
      console.log('fetching friends');
      try {
        const response = await axios.get(`/api/friends?username=${user?.username}`);
        const data = response.data;

        if (response.status === 200) {
          setFriendData(data);
        }
      } catch (e) {
        console.log(e);
      }
    };

    if (user) {
      fetchProfile();
      // fetchFriends(); // Make sure to call this here
    }
  }, [user]);

  if (!isSignedIn) {
    return <p>Please sign in to view your profile.</p>;
  }

  return (
    <div>
      <h2>Welcome, {user.username}</h2>
      {profileData?.imageUrl && (
  <img
    src={profileData.imageUrl}  // Corrected this line
    alt="User's profile picture"
    className="w-24 h-24 rounded-full object-cover"
    width={96}
    height={96}
  />
)}
      <h3>Your Friends:</h3>
      {/* <ul>
        {friendData.map((friend, index) => (
          <li key={index}>{friend.username}</li>
        ))}
      </ul> */}
    </div>
  );
};
