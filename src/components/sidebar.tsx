import { SignOutButton } from '@clerk/nextjs'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

function SideBar() {
  return (
    <div className="flex h-full flex-col w-[10vw] md:w-[15vw] lg:w-[15vw]">
             <h1 className="p-4 font-title text-4xl">cine</h1>
               <div className="flex flex-1 flex-col gap-4 box-border py-24 justify-start text-foreground">
               <Link href='/protected' >
                 <Button variant="light" className='text-foreground'>Home</Button>
               </Link>
               <Link href='/protected/stats'>
                 <Button variant="light" className='text-foreground'>Stats</Button>
             </Link>
               <Link href='/protected/playground'>
                 <Button variant="light" className='text-foreground'>Playground</Button>
               </Link>
               <Link href='/protected/profile'>
                 <Button variant="light" className='text-foreground'>Profile</Button>
               </Link>
             </div>
             <div className='justify-end items-center pl-4 pt-72'>
                <SignOutButton/>
             </div>
        </div>
  )
}

export default SideBar