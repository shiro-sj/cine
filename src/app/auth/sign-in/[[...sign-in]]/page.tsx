import { SignIn } from '@clerk/nextjs'
import React from 'react'

function SignInPage() {
  return (
    <div className='main-div'>
        <SignIn/>
    </div>
  )
}

export default SignInPage