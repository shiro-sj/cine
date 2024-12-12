'use client'

import { useUser } from "@clerk/nextjs";
import { Divider } from "@nextui-org/divider";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSignedIn } = useUser(); 
  return (
    <div className={`flex min-h-screen w-screen p-6 ${isSignedIn ? "flex-row" : "flex-col"}`}>
      {children}

    </div>
  );
}
