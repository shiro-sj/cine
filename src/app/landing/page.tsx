import { SignInButton, SignUpButton } from '@clerk/clerk-react'
import React from 'react'

function Landing() {
  return (
    <div>Landing
        <SignInButton/>
        <SignUpButton/>
    </div>
  )
}

export default Landing