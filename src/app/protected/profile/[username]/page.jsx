'use client'
import { useUser, UserButton } from '@clerk/nextjs';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { use } from 'react';  // Import React.use() to unwrap the promise

export default function Profile({ params }) {
  const { username } = use(params);  // Unwrap the promise here
  const { isSignedIn, user } = useUser();
  const [profileData, setProfileData] = useState(null);
  const [friendData, setFriendData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      console.log('fetching profile');
      try {
        const response = await axios.get(`/api/user?username=${username}`);
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
        const response = await axios.get(`/api/friends?username=${username}`);
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
  }, [username, user]);  // Add username to dependency array

  if (!isSignedIn) {
    return <p>Please sign in to view your profile.</p>;
  }

  return (
    <div>
      <h2>Welcome, {profileData.username}</h2>
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
      {/* Uncomment to display friends */}
      {/* <ul>
        {friendData?.map((friend, index) => (
          <li key={index}>{friend.username}</li>
        ))}
      </ul> */}
    </div>
  );
};
