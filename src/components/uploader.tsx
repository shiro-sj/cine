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
    <div className="container-v">
      <div className={`flex-1 flex flex-col h-full w-full justify-center items-center border-dashed border-4 rounded-lg hover:bg-foreground-50 ${bgcolor}`}>
        <form>
        <input type='file' onChange={handleFileChange} className='w-full h-full'></input>

        </form>

      </div>
      <div className='flex-1'></div>
    </div>
  )
}

export default Uploader
