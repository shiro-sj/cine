import { SignInButton } from '@clerk/nextjs'
import { Button } from '@nextui-org/react'
import React from 'react'

function Landing() {
  return (
    <div className='h-full w-full box-border p-6 flex flex-col gap-10'>
       <div className='relative w-full'>
          <img src='/assets/eye.svg' className='w-full h-[75vh]' alt="Eye Icon" />
          <h1 className='absolute top-1/3 left-1/2 transform -translate-x-1/2 text-6xl text-center'>
            everything you've ever cine.
          </h1>
          <p className='absolute top-2/3 left-1/2 transform -translate-x-1/2 text-4xl text-center pr-6'>
            all in one place.
          </p>
      </div>
      <div className='flex justify-center items-center pb-16'>
        <Button color='primary' size='lg'>View my Stats</Button>
      </div>
      <div className='container-sm justify-center items-center w-full flex'>
        <p className='text-xl'> Upload, Log, and View statistics on your <span className='font-bold'>entire watch history.</span></p>

      </div>
    </div>
  )
}

export default Landing