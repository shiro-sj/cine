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
import SideBar from "@/components/main/sidebar";
import LayoutWrapper from "./layoutWrapper";
import { Divider } from "@nextui-org/divider";


export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="en" className="purple-dark">
      <head>
        <link rel="icon" href="/assets/favicon.ico" sizes="any" />
      </head>
      <body>
        <Providers>
          <LayoutWrapper>
            <SideBar/>
              <main> 
                {children}
              </main>
          </LayoutWrapper>

        </Providers>
      </body>
    </html>
  );
}
