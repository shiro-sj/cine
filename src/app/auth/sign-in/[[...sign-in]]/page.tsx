import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function SignInPage() {
  return (
    <div className='main-div'>
      <div className='container-v'>
        <div className='relative hidden lg:flex-1 lg:flex lg:flex-col gap-10 lg:h-full lg:w-full justify-center items-center'>
          <Image src='/logo.png' height={200} width={200} alt='logo' className='absolut z-10'/>
          <h1 className='font-extrabold text-[40vh] absolute italic bottom-2/5 right-5/6 z-0 text-primary'>cine</h1>
          <div className='gap-5 flex flex-col justify-center items-center z-10'>
            <h1 className='font-semibold'>WELCOME BACK</h1>
            <h3>view your stats and more.</h3>
          </div>
        </div>
        <div className='content-v justify-center items-center'>
          <SignIn/>
        </div>
      </div>
    </div>
  ) 
}

export default SignInPage