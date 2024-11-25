'use client'
import { Button } from '@nextui-org/react'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function FriendsList() {
    const [requests, setRequests] = useState<any[]>([])
    const [currentUser, setCurrentUser] = useState<any>();
    const [selectedRequest, setSelectedRequest] = useState<any>();
    const [sentRequests, setSentRequests] = useState<any[]>([])
    const [friends, setFriends] = useState<any[]>([])

    useEffect(()=>{
        const getCurrentUser = async()=>{
            try{
                const result = await axios.get('/api/users')
                setCurrentUser(result.data.currentUser)
            }catch(error){
                console.log(`Error: ${error}`)
            }
        }

        getCurrentUser();
    },[])
    
    useEffect(()=>{
        const getFriends = async()=>{
            try{
                const results = await axios.get('/api/friends/receivedRequests')
                console.log(results.data)
                setRequests(results.data.requests)
                setFriends(results.data.friends)
                setSentRequests(results.data.sentRequests)
            }catch (error){
                console.log(`Error: ${error}`)
            }
        }
        getFriends();
    }, [])

    const acceptRequest = async(id: number)=>{
        
        try{
            const acceptedRequest = await axios.post('/api/friends/respondToRequest', {id: id, status: 'confirmed'})
            alert('Accepted request.')
        }catch(error){
            console.log(`Error: ${error}`)

        }
    }
    const rejectRequest = async(id: number)=>{
        
        try{
            const rejectedRequest = await axios.post('/api/friends/unfriendUser', {id: id, status: 'unfriended'})
            alert('Rejected request.')
        }catch(error){
            console.log(`Error: ${error}`)

        }
    }
    const unfriendUser = async(id: number)=>{
        
        try{
            const unfriendedUser = await axios.post('/api/friends/unfriendUser', {id: id, status: 'unfriended'})
            alert('Unfriended user.')
        }catch(error){
            console.log(`Error: ${error}`)

        }
    }
  return (
    <div>
        <div>
            Requests:
            <ul>
            {requests.map((request)=><li key={request.id} className='flex flex-row justify-start gap-20 p-5'>
                <img src={request.senderImage} className='w-20 h-20 rounded-full'/>
                <div className='flex flex-col'>
                    <span>sent by: {request.senderUsername}</span>
                    <div className='flex flex-row gap-5'>
                        <Button onClick={()=>{acceptRequest(request.id)}}>Accept</Button>
                        <Button onClick={()=>{rejectRequest(request.id)}}>Reject</Button>
                    </div>

                </div>
                
            </li>)}
            </ul>
        </div>
        <div>
            Sent:
            <ul>
            {sentRequests.map((request)=><li key={request.id} className='flex flex-row justify-start gap-20 p-5'>
                <img src={request.profileImage} className='w-20 h-20 rounded-full'/>
                <div className='flex flex-col'>
                    <span>{request.senderUsername}</span>
                    <span>{request.status}</span>
                </div>
                
            </li>)}
            </ul>
        </div>
        <div>
            Friends:
            <ul>
            {friends.map((friend, index) => (
                <li key={`${friend.id}-${index}`} className="flex flex-row justify-start gap-20 p-5">
                    <img src={friend.profileImage} className="w-20 h-20 rounded-full" alt={`${friend.senderUsername}'s profile`} />
                    <div className="flex flex-col gap-4">
                        <span>{friend.username}</span>
                        <div className="flex flex-row gap-5">
                            <Link href={`/protected/profile/${friend.username}`}>
                                <Button>View Profile</Button>
                            </Link>
                            <Button onClick={() => { unfriendUser(friend.friendId); console.log(friend.id) }}>Unfriend</Button>
                        </div>
                    </div>
                </li>
            ))}

            </ul>
        </div>

        
    </div>
  )
}

export default FriendsList