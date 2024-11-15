import Uploader from '@/components/uploader'
import { Divider } from '@nextui-org/react'
import React from 'react'

function Upload() {
  return (
    <div className='main-div'>
        <div className='container-xs'>
            <div className='content-h'>
                <h1>upload your .csv</h1> 
            </div>
        </div>

        <div className='container-md'>
            <Uploader/>
        </div>
    
        <div className='container-lg'>
            <div className='content-v gap-6'>
                    <h2>step 1</h2>
                    <Divider/>
                    <h3 className='flex justify-center'>go to there</h3>
            </div>
            
        </div>
        <div className='container-lg'>
            <div className='content-h'>
            hello

            </div>
            
        </div>
    </div>
  )
}

export default Upload