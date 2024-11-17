'use client'
import { useParams } from "next/navigation";

export default function Page(){
    const { username } = useParams<{ username: string }>();

    return(
        <h1>{username}</h1>
    )
}