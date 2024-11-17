'use client'
import { useParams } from "next/navigation";
import { use } from "react";

export default function Page({params}){
    const { username } = use({params})

    return(
        <h1>{username}</h1>
    )
}