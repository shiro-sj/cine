import { SignUp, SignUpButton } from '@clerk/nextjs'
import { Button, Link } from '@nextui-org/react'
import React from 'react'

function Tutorial() {
  return (
    <div className='flex-1 flex-col h-[100vh] w-[100vw] flex justify-around items-center text-center'>
      
      <div className='box-border p-4 flex gap-6 justify-center flex-col items-center'>
        <h1>1. Sign In or Create an Account</h1>
        <Button color='primary' variant='flat'>
          <div>
            <SignUpButton/>
          </div>
        </Button>
      </div>
      <div className='box-border p-4 flex gap-6 justify-center flex-col items-center'>
        <h1>2. Download your Netflix Viewing History</h1>
        <a href='https://www.netflix.com/settings/viewed'><p>https://www.netflix.com/settings/viewed</p></a>
      </div>
      <div className='box-border p-4 flex gap-6 justify-center flex-col items-center'>
        <h1>3. Upload your data using the CSV Uploader</h1>
      </div>
      <div className='box-border p-4 flex gap-6 justify-center flex-col items-center'>
        <h1>4. View your Stats!</h1>
      </div>


    </div>
  )
}

export default Tutorial