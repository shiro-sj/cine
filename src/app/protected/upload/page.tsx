import Uploader from '@/components/home/uploader'
import React from 'react'

function Upload() {
  return (
    <div className='h-full w-full flex flex-col gap-2 box-border p-6 justify-center items-center'>
        <h1>Upload your csv</h1>
        <div className='container-md flex justify-center items-center'>
            <Uploader/>
        </div>
    </div>
  )
}

export default Upload