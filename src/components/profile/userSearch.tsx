
'use client'
import { users } from '@/db/schema/users';
import { Autocomplete, AutocompleteItem, Avatar, Button} from '@nextui-org/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'



function SearchUser() {
    const [usersList, setUsersList] = useState<any>(null);
    const [currentUser, setCurrentUser] = useState<any>()
    const [loading ,setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState<any>();

    useEffect(()=>{
        const getUsers = async()=>{
            try{
                const result = await axios.get('/api/users')
                setCurrentUser(result.data.currentUser)
                setUsersList(result.data.usersList)
            }catch(error){
                console.log(`Error: ${error}`)
            }finally{
                setLoading(false)
            }
            
        }

        getUsers();
    },[])

    async function sendRequest() {
        try{
            const sendRequest = await axios.post('/api/friends/sendRequest', {senderId: currentUser.id, senderImage: currentUser.imageUrl, senderUsername: currentUser.username, receiverId: selectedUser, status: 'pending'})
            if (sendRequest){
                alert('Friend request sent.')
            }
        } catch(error){
            console.log(`error sending data: ${error}`)
        }
        
    }

    if(loading){
        return(
            <div>Loading...</div>
        )
    }

    if(!users){
        return(
            <div>Error loading users.</div>
        )
    }

    const setUser = (id:any) => {
        console.log(id)
        setSelectedUser(id)
    }

    console.log(setUser)

    
  return (
    <Autocomplete placeholder="Find a user">
        {usersList.map((user:any)=>
        <AutocompleteItem key={user.userId} textValue={user.username} isReadOnly onPointerEnter={()=> {setSelectedUser(user.userId); console.log(user.userId)}}>
            <div className="flex flex-row gap-10 items-center justify-left w-full">
            <Avatar alt={user.username} className="flex-shrink-0" size="sm" src={user.profileImage} />
            <span className='text-small'>{user.username}</span>
            <Button variant='ghost' className='text-small' onClick={sendRequest}>add</Button>
            </div>
        </AutocompleteItem>
        
        )}
        

    </Autocomplete>
    
  )
}

export default SearchUser