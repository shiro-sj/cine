'use client'
import {useUser} from "@clerk/nextjs"
import StatGrid from "@/components/statGrid"
import { avatar, Avatar, Badge, Button, Card, CardBody, CardFooter, Divider, Input, Image, Listbox, ListboxItem, ScrollShadow } from "@nextui-org/react";
import Link from "next/link";
import Diversity3RoundedIcon from '@mui/icons-material/Diversity3Rounded';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Footer from "@/components/footer";

const friendsList = [
  {
    name: 'testuser',
    username: '@testuser'
  },

];


const recents = [
  { id: 1, title: "Bojack Horseman", date: "Today", image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fget.wallhere.com%2Fphoto%2FBojack-Bojack-Horseman-series-2140081.jpg&f=1&nofb=1&ipt=086dbdc34ee1bb73da809893fd445ac9223455d4199d991f19315d244e8e5047&ipo=images" , img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FM%2FMV5BYWQwMDNkM2MtODU4OS00OTY3LTgwOTItNjE2Yzc0MzRkMDllXkEyXkFqcGdeQXVyMTkxNjUyNQ%40%40._V1_.jpg&f=1&nofb=1&ipt=b59c2458a9b3fe4e5f21293fa2663fec42fe5c33ecbb186ed9d44e3ffa6a5d13&ipo=images"},
  { id: 2, title: "Stranger Things", date: "Yesterday", image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmir-s3-cdn-cf.behance.net%2Fproject_modules%2Ffs%2F415b2e58808319.5bf89df796f80.jpg&f=1&nofb=1&ipt=a1d4a86efbf19b0db6e8b7ebf66824a5747cabb0e21fa99503c1fdf83fc2fd93&ipo=images", img: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimages6.fanpop.com%2Fimage%2Fphotos%2F39800000%2FStranger-Things-stranger-things-39804329-1280-1896.jpg&f=1&nofb=1&ipt=f7302bf5067741c6c2073e499225ad42bcb5576897c91896b3d91a17bbcacbdd&ipo=images" },
  { id: 3, title: "The Crown", date: "2 days ago", image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F2.bp.blogspot.com%2F-Nn7bfPEZjJI%2FWBu5l_-HFqI%2FAAAAAAABa2c%2FdQzSHkkO0loYt0A4GqT9sPxZ7lZG3FhQgCLcB%2Fs1600%2Fthe-crown-netflix-banner-poster-3.jpg&f=1&nofb=1&ipt=84bf53ff03b18a20e108da6206149bf7b5228da9f0a6240cfd3dc04cf97938a5&ipo=images", img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.themoviedb.org%2Ft%2Fp%2Foriginal%2FhqmDLY8BSuHmldBuuUwNNt8L45G.jpg&f=1&nofb=1&ipt=5dbc05f2b36b972f4706f61a3a61241d0e8ec0ea1ca8d2ebe43f8c58503e727a&ipo=images" },
  { id: 4, title: "Breaking Bad", date: "3 days ago", image: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Ffc06.deviantart.net%2Ffs71%2Ff%2F2011%2F169%2F8%2F0%2Fbreaking_bad_by_vprnl-d3j7rdx.jpg&f=1&nofb=1&ipt=634cf9cb7d529687439df0790a811247ba6081140d6340810d712190e6ae9983&ipo=images", img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Frotativo.com.mx%2Fuploads%2Fs1%2F41%2F31%2F18%2F4%2Fa-e-keyart-breakingbadspecial.jpeg&f=1&nofb=1&ipt=706688a522520239b11afd8aabc21b53aa58cde8f647291d37a868e6f3c9b135&ipo=images" },
  { id: 5, title: "The Office", date: "4 days ago", image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic1.srcdn.com%2Fwordpress%2Fwp-content%2Fuploads%2F2022%2F08%2FThe-Office-1.jpg&f=1&nofb=1&ipt=a0f4dd630692fd4a95797ee63b8e2302b25676c34fde9eed313fc6f33e5e4f91&ipo=images", img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fflxt.tmsimg.com%2Fassets%2Fp7893511_b_v8_ab.jpg&f=1&nofb=1&ipt=1cc4287afc3c5ec4aff913fdc0c5119709fc5ef3d5afb628d9965bc5405f5e3d&ipo=images" },
  { id: 6, title: "Bojack Horseman", date: "Today", image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fget.wallhere.com%2Fphoto%2FBojack-Bojack-Horseman-series-2140081.jpg&f=1&nofb=1&ipt=086dbdc34ee1bb73da809893fd445ac9223455d4199d991f19315d244e8e5047&ipo=images" , img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FM%2FMV5BYWQwMDNkM2MtODU4OS00OTY3LTgwOTItNjE2Yzc0MzRkMDllXkEyXkFqcGdeQXVyMTkxNjUyNQ%40%40._V1_.jpg&f=1&nofb=1&ipt=b59c2458a9b3fe4e5f21293fa2663fec42fe5c33ecbb186ed9d44e3ffa6a5d13&ipo=images"},
  { id: 7, title: "Stranger Things", date: "Yesterday", image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmir-s3-cdn-cf.behance.net%2Fproject_modules%2Ffs%2F415b2e58808319.5bf89df796f80.jpg&f=1&nofb=1&ipt=a1d4a86efbf19b0db6e8b7ebf66824a5747cabb0e21fa99503c1fdf83fc2fd93&ipo=images", img: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimages6.fanpop.com%2Fimage%2Fphotos%2F39800000%2FStranger-Things-stranger-things-39804329-1280-1896.jpg&f=1&nofb=1&ipt=f7302bf5067741c6c2073e499225ad42bcb5576897c91896b3d91a17bbcacbdd&ipo=images" },
  { id: 8, title: "The Crown", date: "2 days ago", image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F2.bp.blogspot.com%2F-Nn7bfPEZjJI%2FWBu5l_-HFqI%2FAAAAAAABa2c%2FdQzSHkkO0loYt0A4GqT9sPxZ7lZG3FhQgCLcB%2Fs1600%2Fthe-crown-netflix-banner-poster-3.jpg&f=1&nofb=1&ipt=84bf53ff03b18a20e108da6206149bf7b5228da9f0a6240cfd3dc04cf97938a5&ipo=images", img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.themoviedb.org%2Ft%2Fp%2Foriginal%2FhqmDLY8BSuHmldBuuUwNNt8L45G.jpg&f=1&nofb=1&ipt=5dbc05f2b36b972f4706f61a3a61241d0e8ec0ea1ca8d2ebe43f8c58503e727a&ipo=images" },
  { id: 9, title: "Breaking Bad", date: "3 days ago", image: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Ffc06.deviantart.net%2Ffs71%2Ff%2F2011%2F169%2F8%2F0%2Fbreaking_bad_by_vprnl-d3j7rdx.jpg&f=1&nofb=1&ipt=634cf9cb7d529687439df0790a811247ba6081140d6340810d712190e6ae9983&ipo=images", img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Frotativo.com.mx%2Fuploads%2Fs1%2F41%2F31%2F18%2F4%2Fa-e-keyart-breakingbadspecial.jpeg&f=1&nofb=1&ipt=706688a522520239b11afd8aabc21b53aa58cde8f647291d37a868e6f3c9b135&ipo=images" },
  
];



function Home() {
    const {user, isSignedIn} = useUser();
    let avatarSrc;
    let username;

    if (isSignedIn){
        avatarSrc = user.imageUrl;
        username = user.username;
    } else{
        avatarSrc = './default-avatar.png'
        username = 'user'
    }

    return (
      <div className="h-full w-full flex flex-row gap-2">
        <div className="basis-4/5 p-6 box-border">
        <ScrollShadow hideScrollBar className="h-screen">
          <div className="flex flex-col gap-10">
            <h1>Welcome back, <span className="font-semibold">{username}</span></h1>

            <div className="flex flex-row justify-between">
              <div className="flex gap-4">
                <Button size="sm">Log</Button>
                <Button size="sm">
                  <Link href="/protected/upload">
                    Upload
                  </Link>
                </Button>
              </div>
              <Input size="sm" placeholder="Search" className="basis-2/5" radius="md"/>
            </div>

            <div className="">
              <StatGrid/>
            </div>


            <div className="max-w-full">
              <h2 className="pb-5">Your recent activity</h2>
              <ScrollShadow orientation="horizontal" hideScrollBar className="max-w-full">
                <div className="h-[20vh] max-w-full flex gap-4">
                  {recents.map((recent)=>
                    <div key={recent.id} className="w-1/4 flex-shrink-0">
                    <Card className="max-w-full h-full">
                      <CardBody className="scrollbar-hide p-0">
                        <div className="w-full max-h-full">
                          <Image
                            shadow="sm"
                            radius="lg"
                            width="100%"
                            alt={recent.title}
                            src={recent.image}
                            className="object-cover"
                          />
                        </div>  
                      </CardBody>
                      <CardFooter className="max-w-full ">
                        <div className="flex flex-col justify-start items-start text-xs">
                          <b>{recent.title}</b>
                          <p>{recent.date}</p>
                        </div>
                      </CardFooter>
                    </Card>
                  </div>
                )}
                </div>
              </ScrollShadow>
            </div>

            <div className="max-w-full">
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
            </div>

            <div className="max-w-full">
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
            </div>

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




        <div className="basis-1/5 flex flex-col">
          <div className="flex flex-row justify-between text-2xl box-border p-6 items-center">
            <NotificationsNoneIcon fontSize="inherit"/>
            <Avatar src={avatarSrc} className="outline-2 outline-primary outline-offset-1" size="sm"/>
          </div>

          <div className="box-border p-3">
             <div className="text-2xl flex flex-col justify-center items-center">
               <Diversity3RoundedIcon fontSize="inherit" />
             </div>
             <div className="box-border p-4">
             <Listbox className="flex flex-col gap-4">
               {friendsList.map((friend)=>
              <ListboxItem key={friend.username}>
                <div className="flex flex-row justify-start gap-4">
                  <Badge content="" color="success" shape="circle" placement="top-right">
                    <Avatar src='/assets/default-avatar.jpg' size="md" radius="md" isBordered color="success"/>
                  </Badge>
                  <div className="flex flex-col">
                    <p className="flex items-center text-xs font-semibold">{friend.name}</p>
                    <p className="flex items-center text-tiny">{friend.username}</p>
                  </div>
                </div>
              </ListboxItem>)}
              
            </Listbox>

            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default Home