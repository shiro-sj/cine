import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// className={`${geistSans.variable} ${geistMono.variable} antialiased`}

export const metadata: Metadata = {
  title: "cine",
  description: "watch statistics and more.",
};

import {Providers} from "./providers";
import NavBar from "@/components/navbar";

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="en" className="purple-dark">
      <head>
        <link rel="icon" href="/assets/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen">
        <Providers>
          <div className="purple-dark bg-background text-foreground flex flex-col min-h-screen"> 
            <NavBar />
            <main> 
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
