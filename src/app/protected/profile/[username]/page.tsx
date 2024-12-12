import RecentsBar from "@/components/home/recentsBar";
import FriendsGrid from "@/components/profile/friendsGrid";
import FriendsProfile from "@/components/profile/friendsProfile";
import FriendsRecentsBar from "@/components/profile/friendsRecentsBar";
import FriendsStatsBar from "@/components/profile/friendsStatsBar";
import FriendsTopGenresBar from "@/components/profile/friendsTopGenresBar";
import FriendsTopWatchedBar from "@/components/profile/friendsTopWatchedBar";
import { db } from "@/db";
import { users } from "@/db/schema/users";
import { Friend } from "@/lib/interfaces";
import { ScrollShadow } from "@nextui-org/react";
import axios from "axios";
import { eq } from "drizzle-orm";

export default async function Page({ params }: { params: { username: string } }) {
  const { username } =  await params;

  return (
    <div className="min-h-screen w-full">
      <ScrollShadow className="max-h-screen scrollbar-hide">
        <div className="w-full h-[5vh]"></div>
        <FriendsProfile username={username}/>
        
        <h1 className="p-10">Recents</h1>
        <div className="md:h-[20vh] lg:h-[25vh] h-[15vh] w-full flex flex-col gap-4 box-border px-10">
          <ScrollShadow orientation="horizontal" hideScrollBar className="w-[80vw]">
            <FriendsRecentsBar username={username}/>
          </ScrollShadow>
        </div>
        <div className="box-border p-10">
          <FriendsStatsBar username={username}/>
        
        </div>
        
        
        <h1 className="p-10">Top Watched Shows and Movies</h1>
        <div className="md:h-[20vh] lg:h-[25vh] h-[15vh] w-full flex flex-col gap-4 box-border px-10">
          <ScrollShadow orientation="horizontal" hideScrollBar className="w-[80vw]">
            <FriendsTopWatchedBar username={username}/>
          </ScrollShadow>
        </div>
        <h1 className="p-10">Top Genres</h1>
        <div className="md:h-[20vh] lg:h-[25vh] h-[15vh] w-full flex flex-col gap-4 box-border px-10">
          <ScrollShadow orientation="horizontal" hideScrollBar className="w-[80vw]">
            <FriendsTopGenresBar username={username}/>
          </ScrollShadow>
        </div>
       
      </ScrollShadow>
    </div>
  );
}
