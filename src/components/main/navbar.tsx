'use client'
import React from 'react'

import {  Navbar ,   NavbarBrand,   NavbarContent,   NavbarItem} from "@nextui-org/navbar";
import Link from 'next/link';
import { SignInButton, SignOutButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import {Button} from "@nextui-org/button";

const userMenuItems = [
    { title: 'home', path: '/protected' },
    { title: 'stats', path: '/protected/stats' },
    { title: 'playground', path: '/protected/playground'},
    { title: 'profile', path: '/protected/profile' },
  ];
const guestMenuItems = [
    { title: 'about', path: '/' },
    { title: 'documentation', path: '/' },
    { title: 'contact us', path: '/' },
  ];


function NavBar() {
    const {isSignedIn} = useUser();

  return (
    <Navbar className='box-border' position='sticky'  maxWidth='full' shouldHideOnScroll isBordered isBlurred={false}>
        <NavbarContent justify='start'>
            <NavbarBrand className='text-2xl font-bold'>
                cine
            </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify='center' className='hidden md:flex gap-8 text-foreground'>
        {isSignedIn ? (
          userMenuItems.map(item => (
            <NavbarItem key={item.title}>
              <Link href={item.path} className='text-xl'>
                {item.title}
              </Link>
            </NavbarItem>
          ))
        ) : (
            guestMenuItems.map(item => (
                <NavbarItem key={item.title}>
                  <Link href={item.path} className='text-2xl'>
                    {item.title}
                  </Link>
                </NavbarItem>
              ))
        )}
        </NavbarContent>

        <NavbarContent justify='end' className='gap-4'>
            {isSignedIn? (
                <NavbarItem className='flex flex-row gap-4'>
                    <UserButton/>
                    <SignOutButton/>
                </NavbarItem>
            ):(
                <>
                <NavbarItem>
                    <SignInButton/>
                </NavbarItem>
                <NavbarItem>
                    <SignUpButton>
                        <Button color='primary' variant='ghost' size='md' className='text-foreground'>
                            Sign Up
                        </Button>
                    </SignUpButton>
                </NavbarItem>
                </>
            )}
        </NavbarContent>
        
    </Navbar>
  )
}

export default NavBar;