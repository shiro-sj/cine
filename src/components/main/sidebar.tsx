'use client'
import { SignInButton, SignOutButton, SignUpButton, useUser } from '@clerk/nextjs'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

export default function SideBar() {

  const {isSignedIn} = useUser();

  return (
    <>
    {isSignedIn? (
      <div className="flex h-[95vh] flex-col w-[10vw] md:w-[15vw] lg:w-[15vw] border-r-2 border-content1">
        <h1 className="p-4 text-4xl">cine</h1>
          <div className="flex flex-1 flex-col gap-4 box-border py-24 justify-start text-foreground">
            <Link href='/protected'>
              <Button variant="light" className='flex text-left items-center justify-start'>Home</Button>
            </Link>
            <Link href='/protected/stats'>
              <Button variant="light" className='flex text-left items-center justify-start'>Stats</Button>
            </Link>
            <Link href='/protected/playground'>
              <Button variant="light" className='flex text-left items-center justify-start'>Playground</Button>
            </Link>
            <Link href='/protected/profile'>
              <Button variant="light" className='flex text-left items-center justify-start'>Profile</Button>
            </Link>
          </div>
        <div className='justify-end items-center pl-4 pt-72'>
          <SignOutButton/>
        </div>
      </div>
    ): (
      <div className='h-[5vh] w-full justify-around flex flex-row items-center'>
        <Link href='/'><h1 className='text-4xl'>cine</h1></Link>
        <div className='flex flex-row gap-8'>
          <Link href='/landing/about'><p>About</p></Link>
          <Link href='/landing/tutorial'><p>Tutorial</p></Link>
          <Link href='/landing/trial'><p className='font-semibold'>Try It Out</p></Link>
        </div>
        <div className='gap-6 flex flex-row'>
          <SignInButton/>
          <SignUpButton/>
        </div>

      </div>
    )}
    </>
    
  )
}
