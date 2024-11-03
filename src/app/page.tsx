"use client"
import { useUser } from "@clerk/nextjs";
import Landing from "./landing/page";
import Home from "./protected/page";


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