"use client"
import { useUser } from "@clerk/nextjs";
import Landing from "./landing/page";
import Home from "./protected/page";


export default function Page() {
  const { isSignedIn } = useUser();

  return (
    <div>
      {isSignedIn? <Home/>: <Landing/>}
    </div>
  );
}