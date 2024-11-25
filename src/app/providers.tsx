// app/providers.tsx
'use client'

import { ClerkProvider } from '@clerk/nextjs'
import {NextUIProvider} from '@nextui-org/react'
import {dark} from '@clerk/themes'

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark , variables: { colorBackground: "transparent", fontSize: "text-xl", colorPrimary: '#7318A2', colorTextOnPrimaryBackground:'white', colorTextSecondary:'white', colorText:'white'}, layout:{unsafe_disableDevelopmentModeWarnings: true} }}>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </ClerkProvider>
  )
}