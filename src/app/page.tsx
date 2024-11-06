'use client';
import dynamic from 'next/dynamic';
import { useUser } from '@clerk/nextjs';

const Landing = dynamic(() => import('./landing/page'), { ssr: false });
const Home = dynamic(() => import('./(protected)/page'), { ssr: false });

export default function Page() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isSignedIn ? <Home /> : <Landing />}
    </>
  );
}
