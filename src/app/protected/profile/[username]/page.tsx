import FriendsData from "@/components/friendsData"
import StatGridFriend from "@/components/statGridFriend"
import axios from "axios"

export default async function Page({
    params,
  }: {
    params: Promise<{ username: string }>
  }) {
    const username = (await params).username
   

    return (
    <div className="main-div">
      <div className="container-lg">
        <StatGridFriend/>
      </div>
    </div>
  )
  }