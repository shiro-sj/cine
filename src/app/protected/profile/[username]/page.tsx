import FriendsProfile from "@/components/profile/friendsProfile";
import FriendsRecentsBar from "@/components/profile/friendsRecentsBar";
import FriendsStatsBar from "@/components/profile/friendsStatsBar";
import FriendsTopGenresBar from "@/components/profile/friendsTopGenresBar";
import FriendsTopWatchedBar from "@/components/profile/friendsTopWatchedBar";
import { ScrollShadow } from "@nextui-org/react";

// Ensure PageProps is correctly defined as an object
interface PageProps {
  params: { username: string };
}

// No need to await params, params is a synchronous object
export default function Page({ params }: PageProps) {
  const { username } = params;

  // Now params is correctly typed
  return (
    <div className="min-h-screen w-full">
      <ScrollShadow className="max-h-screen scrollbar-hide">
        <div className="w-full h-[5vh]"></div>
        <FriendsProfile username={username} />
        
        <h1 className="p-10">Recents</h1>
        <div className="md:h-[20vh] lg:h-[25vh] h-[15vh] w-full flex flex-col gap-4 box-border px-10">
          <ScrollShadow orientation="horizontal" hideScrollBar className="w-[80vw]">
            <FriendsRecentsBar username={username} />
          </ScrollShadow>
        </div>
        <div className="box-border p-10">
          <FriendsStatsBar username={username} />
        </div>

        <h1 className="p-10">Top Watched Shows and Movies</h1>
        <div className="md:h-[20vh] lg:h-[25vh] h-[15vh] w-full flex flex-col gap-4 box-border px-10">
          <ScrollShadow orientation="horizontal" hideScrollBar className="w-[80vw]">
            <FriendsTopWatchedBar username={username} />
          </ScrollShadow>
        </div>
        
        <h1 className="p-10">Top Genres</h1>
        <div className="md:h-[20vh] lg:h-[25vh] h-[15vh] w-full flex flex-col gap-4 box-border px-10">
          <ScrollShadow orientation="horizontal" hideScrollBar className="w-[80vw]">
            <FriendsTopGenresBar username={username} />
          </ScrollShadow>
        </div>
      </ScrollShadow>
    </div>
  );
}
