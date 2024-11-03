import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import NavBar from "@/components/navbar";

export const metadata: Metadata = {
  title: "cine",
  description: "watch statistics and more.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
          <html lang="en" suppressHydrationWarning>
            <body className="min-h-screen">
              <NextThemesProvider attribute="class" defaultTheme="dark">
              <NextUIProvider>
                <div className="relative flex flex-col h-screen">
                  <NavBar/>
                  <main>
                  {children}
                  </main>
                </div>
              </NextUIProvider>
              </NextThemesProvider>
            </body>
          </html>
    </ClerkProvider>
  );
}
