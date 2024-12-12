'use client'
import {UserButton, useUser} from "@clerk/nextjs"
import StatGrid from "@/components/home/statGrid"
import { avatar, Avatar, Badge, Button, Card, CardBody, CardFooter, Divider, Input, Image, Listbox, ListboxItem, ScrollShadow } from "@nextui-org/react";
import Link from "next/link";
import Diversity3RoundedIcon from '@mui/icons-material/Diversity3Rounded';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Footer from "@/components/main/footer";
import { useEffect, useState } from "react";
import { Friend, recentEntries } from "@/lib/interfaces";
import RecentsBar from "@/components/home/recentsBar";
import axios from "axios";
import FriendsBar from "@/components/home/friendsBar";


function Home() {
    const[recents, setRecents] = useState<recentEntries[]>([])
    const {user, isSignedIn} = useUser();
    const [friends, setFriends] = useState<Friend[]>([])
    let avatarSrc;
    let username;

    if (isSignedIn){
        avatarSrc = user.imageUrl;
        username = user.username;
    } else{
        avatarSrc = './default-avatar.png'
        username = 'user'
    }

    useEffect(()=>{
      const fetchData = async () => {
        try{
          const response = await axios.get(`/api/logs/recents`); 
          setRecents(response.data)
          console.log(recents)
        } catch{
          
        }
        
      };

      const fetchFriends = async () => {
        try {
          const response = await axios.get(`/api/friends/getFriends`); 
          setFriends(response.data)
          console.log(response.data)
        } catch (error) {
        
        }
      }

      fetchData();
      fetchFriends();
    }, []);
      


    

    return (
      <div className="h-full max-w-full flex flex-row gap-2">
        <div className="basis-4/5 p-6 box-border">
        <ScrollShadow hideScrollBar className="h-screen">
          <div className="flex flex-col gap-10">
            <h1 className="box-border pb-4 border-b-2 border-content1">Welcome back, <span className="font-semibold">{username}</span></h1>


            <div className="flex flex-row justify-between">
              <div className="flex gap-4">
                <Button size="sm" color='primary'><Link href='/protected/log'>Log</Link></Button>
                <Button size="sm"  color='primary'>
                  <Link href="/protected/upload">
                    Upload
                  </Link>
                </Button>
              </div>
              <Input size="sm" placeholder="Search" className="basis-2/5" radius="md"/>
            </div>

            <div className="max-w-full">
              <StatGrid/>
            </div>


            <div>
              <div className=" flex flex-row justify-between items-center">
                <h2 className="pb-5">Your recent activity</h2>
                <Link href="/protected/profile" className="text-right">
                  <p className="text-opacity-30 text-xs">View All</p>
                </Link>
              </div>
              
              <ScrollShadow orientation="horizontal" hideScrollBar className="w-[65vw]">
                <RecentsBar recentEntries={recents}/>
              </ScrollShadow>
            </div>

            {/* <div className="max-w-full">
              <h2 className="pb-5">Recently from friends</h2>
              <ScrollShadow orientation="horizontal" hideScrollBar className="max-w-full">
                <div className="h-[10vh] max-w-full flex gap-4">
                  {recents.map((recent)=>
                    <div key={recent.id} className="w-1/4 flex-shrink-0">
                    <Card className="max-w-full h-full">
                      <CardBody className="scrollbar-hide p-0">
                        <div className="w-full max-h-full text-xs flex flex-col gap-2 justify-start items-start box-border p-3">
                          <p>@testuser</p>
                          <p>watched Black Mirror: Hang the DJ</p>
                        </div>  
                      </CardBody>
                    </Card>
                  </div>
                )}
                </div>
              </ScrollShadow>
            </div> */}

            {/* <div className="max-w-full">
              <h2 className="pb-5">Your next watch</h2>
              <ScrollShadow orientation="horizontal" hideScrollBar className="max-w-full">
                <div className="h-[30vh] max-w-full flex gap-4">
                  {recents.map((recent)=>
                    <div key={recent.id} className="w-1/6 flex-shrink-0">
                    <Card className="max-w-full h-full">
                      <CardBody className="scrollbar-hide p-0">
                        <div className="w-full max-h-full">
                            <Image
                              shadow="sm"
                              radius="lg"
                              width="100%"
                              alt={recent.title}
                              src={recent.img}
                              className="object-cover"
                            />
                          </div>  
                      </CardBody>
                    </Card>
                  </div>
                )}
                </div>
              </ScrollShadow>
            </div> */}

            <div className="h-[50vh] box-border p-6">
              <div className="basis-3/4 flex flex-col gap-4">
                <div className="basis-1/4 flex justify-center items-center">
                  <h1>Try out our new playground features!</h1>
                </div>
                <div className="flex flex-col justify-center items-center gap-4">
                  <h2>Ticket Generator</h2>
                  <div className="flex flex-row justify-center items-center gap-10">
                    <Image src="/assets/CineMovieTicket.png" className="h-[40vh]"/>
                    <Button><Link href={'/protected/playground'}>Try it out</Link></Button>
                  </div>
                  
                </div>
              </div>
            </div>
            <Footer/>
          </div>
        </ScrollShadow>
        </div>




        <div className="border-l-2 border-content1 basis-1/5 flex flex-col">
          <div className="flex flex-row justify-between text-2xl box-border p-6 items-center">
            <NotificationsNoneIcon fontSize="inherit"/>
            <div>
              <UserButton/>
            </div>
          </div>

          <div className="box-border p-3">
             <div className="text-2xl flex flex-col justify-center items-center">
               <Diversity3RoundedIcon fontSize="inherit" />
             </div>
             <div className="box-border p-4">
              <FriendsBar friends={friends}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default Home