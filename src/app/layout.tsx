import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { NextUIProvider } from "@nextui-org/system";
import NavBar from "@/components/navBar";
import { dark } from "@clerk/themes";

export const metadata: Metadata = {
  title: "cine",
  description: "watch statistics and more.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>, ) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark , variables: { colorBackground: "transparent", fontSize: "text-xl", colorPrimary: '#7318A2', colorTextOnPrimaryBackground:'white', colorTextSecondary:'white', colorText:'white'}, layout:{unsafe_disableDevelopmentModeWarnings: true} }}>
      <html lang="en" suppressHydrationWarning>
        <body className="min-h-screen"> 
            <NextUIProvider>
              <div className="purple-dark bg-background text-foreground flex flex-col min-h-screen"> 
                <NavBar />
                <main> 
                  {children}
                </main>
              </div>
            </NextUIProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
