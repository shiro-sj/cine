'use client'
import axios from 'axios'
import React, { useEffect } from 'react'

function FriendsData() {

    useEffect(()=>{
        const getFriend = async() => {
            try{
                const results = await axios.get(`/api/friends/getData`)
                console.log(results.data)
            }catch(error){
                console.log(error)
            }
        }
    })
    
  return (
    <div> Data</div>
  )
}

export default FriendsData