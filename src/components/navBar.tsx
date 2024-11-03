'use client'
import React from 'react'

import {  Navbar ,   NavbarBrand,   NavbarContent,   NavbarItem,   NavbarMenuToggle,  NavbarMenu,  NavbarMenuItem} from "@nextui-org/navbar";
import Link from 'next/link';
import { SignInButton, SignOutButton, SignUpButton, useUser } from '@clerk/nextjs';
import {Button} from "@nextui-org/button";

const userMenuItems = [
    { title: 'home', path: '/protected' },
    { title: 'stats', path: '/protected/stats' },
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
    <Navbar position='sticky'  maxWidth='full' shouldHideOnScroll isBlurred>
        <NavbarContent justify='start'>
            <NavbarBrand className='text-2xl font-bold'>
                cine
            </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify='center' className='gap-8'>
        {isSignedIn ? (
          userMenuItems.map(item => (
            <NavbarItem key={item.title}>
              <Link href={item.path} className='text-2xl'>
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
                <NavbarItem>
                    <SignOutButton/>
                </NavbarItem>
            ):(
                <>
                <NavbarItem>
                    <SignInButton/>
                </NavbarItem>
                <NavbarItem>
                    <SignUpButton>
                        <Button color='primary' variant='flat' size='md'>
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