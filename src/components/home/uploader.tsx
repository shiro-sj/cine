'use client'
import React, { useState } from 'react'
import Papa from 'papaparse'
import axios from 'axios'

function Uploader() {
  const [bgcolor] = useState('')

  

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>){
    const file = event.target.files?.[0]
    

    if (file) {
        //create a new instance of file reader
        const reader = new FileReader()
        //call the file reader
        reader.onload = async (e) => {
            //get the file content as a string
            const content = e.target?.result as string
            Papa.parse(content, {
                header:true,
                skipEmptyLines: true,
                complete: async (results)=> {
                   try{
                    await axios.post('/api/upload', results.data)
                    alert('uploaded succesfully!')
                    event.target.value = ''
                   } catch (error){
                    console.log(error)
                   }
                  
                }
            })

           
        }

        reader.readAsText(file);
    }

    

  }


  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className={`flex flex-col h-full w-1/2 justify-center items-center border-4 rounded-lg hover:bg-foreground-50 ${bgcolor}`}>
        <form className='flex justify-center items-center'>
          <input type='file' onChange={handleFileChange} className='w-full h-full flex justify-center items-center'></input>
        </form>
      </div>
    </div>
  )
}

export default Uploader
