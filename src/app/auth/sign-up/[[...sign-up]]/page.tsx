import { SignUp } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function SignUpPage() {
  return (
  <div className='h-full w-full min-h-full box-border p-8'>
    <div className='container-v h-full w-full flex justify-center items-center'>
      <div className='relative hidden lg:flex-1 lg:flex lg:flex-col gap-10 lg:h-full lg:w-full justify-center items-center'>
        <Image src='/assets/logo.png' height={200} width={200} alt='logo' className='absolut z-10'/>
        <h1 className='font-extrabold text-[40vh] absolute italic bottom-2/5 right-5/6 z-0 text-purpledark'>cine</h1>
        <div className='gap-5 flex flex-col justify-center items-center z-10'>
          <h1 className='font-semibold'>JOIN US</h1>
          <h3>view your stats and more.</h3>
        </div>
      </div>
      <div className='content-v justify-center items-center'>
        <SignUp/>
      </div>
    </div>
  </div>
  )
}

export default SignUpPage