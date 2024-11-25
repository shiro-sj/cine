import { ActivityGridProps } from '@/lib/interfaces'
import XIcon from '@mui/icons-material/X';
import { Avatar, Divider } from '@nextui-org/react'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faLetterboxd} from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import Image from 'next/image';

function ActivityGrid({avatarSrc, username}: ActivityGridProps) {
  return (
        <div className='container-v'>
            <div className='basis-2/3 h-full w-full box-border p-2 flex flex-col'>
                <h1>recent activity</h1>
                <div className='activity-container'>
                    <div className='activity-card'>
                        <div className='activity-img'>
                            <Image fill className='object-contain' src={'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg4.hulu.com%2Fuser%2Fv3%2Fartwork%2F8e800478-3707-47ae-b39f-2838d33b6d00%3Fbase_image_bucket_name%3Dimage_manager%26base_image%3D754da802-b3a2-453d-8361-3c233952306c%26size%3D1200x630%26format%3Djpeg%26operations%3D%5B%257B%2522gradient_vector%2522%3A%2522(0%252C0%252C0%252C0.5)%257C(0%252C0%252C0%252C0)%257C(0%252C600)%257C(0%252C240)%2522%257D%252C%257B%2522overlay%2522%3A%257B%2522position%2522%3A%2522SouthEast%257C(30%252C30)%2522%252C%2522operations%2522%3A%5B%257B%2522image%2522%3A%2522image_manager%257C869e68d8-de1f-4c66-ac40-521d403076eb%2522%257D%252C%257B%2522resize%2522%3A%2522204x204%257Cmax%2522%257D%252C%257B%2522extent%2522%3A%2522204x204%2522%257D%5D%257D%257D%252C%5D&f=1&nofb=1&ipt=d57babc554a4b83f96d9214369c004f3a883d242255c491f768e158cfe9006b5&ipo=images'} alt="movie/show poster"/>
                        </div>
                        <div className='activity-content'>
                            <h4>JJ2333 watched</h4>
                            <h3>Trap Jazz <span className='text-medium'>2023</span></h3>
                            <p>Oct 31, 2024</p>
                        </div>
                    </div>
                    <Divider orientation='horizontal' className='w-2/3 mx-auto'/>
                    <div className='activity-card'>
                        <div className='activity-img'>
                            <Image fill className='object-contain' src={'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg4.hulu.com%2Fuser%2Fv3%2Fartwork%2F8e800478-3707-47ae-b39f-2838d33b6d00%3Fbase_image_bucket_name%3Dimage_manager%26base_image%3D754da802-b3a2-453d-8361-3c233952306c%26size%3D1200x630%26format%3Djpeg%26operations%3D%5B%257B%2522gradient_vector%2522%3A%2522(0%252C0%252C0%252C0.5)%257C(0%252C0%252C0%252C0)%257C(0%252C600)%257C(0%252C240)%2522%257D%252C%257B%2522overlay%2522%3A%257B%2522position%2522%3A%2522SouthEast%257C(30%252C30)%2522%252C%2522operations%2522%3A%5B%257B%2522image%2522%3A%2522image_manager%257C869e68d8-de1f-4c66-ac40-521d403076eb%2522%257D%252C%257B%2522resize%2522%3A%2522204x204%257Cmax%2522%257D%252C%257B%2522extent%2522%3A%2522204x204%2522%257D%5D%257D%257D%252C%5D&f=1&nofb=1&ipt=d57babc554a4b83f96d9214369c004f3a883d242255c491f768e158cfe9006b5&ipo=images'} alt="movie/show poster"/>
                        </div>
                        <div className='activity-content'>
                            <h4>JJ2333 watched</h4>
                            <h3>Trap Jazz <span className='text-medium'>2023</span></h3>
                            <p>Oct 31, 2024</p>
                        </div>
                    </div>
                    <Divider orientation='horizontal' className='w-2/3 mx-auto'/>
                </div>
 
            </div>
            <div className='basis-1/3 h-full w-full'>
                <div className='activity-profile'>
                    <div className='justify-center flex items-center flex-col h-full w-full gap-4'>
                        <Avatar src={avatarSrc} className='h-28 w-28 outline-2 outline-primary-50 outline-offset-4'/>
                        <h3 className='underline underline-offset-4 font-semibold'>{username}</h3>
                        <h4>1 friend</h4>
                        <div className='flex flex-row pt-2 divide-x-2 w-full '>
                            <div className='activity-icon flex-1'>
                                <Link href='/'>
                                    <XIcon fontSize='inherit'/>
                                </Link>
                            </div>
                            <div className='activity-icon flex-1'>
                                <Link href='/'>
                                    <FontAwesomeIcon icon={faLetterboxd}/>
                                </Link>
                                
                            </div>
                            <div className='activity-icon flex-1'>
                                <Link href='/'>
                                    <FontAwesomeIcon icon={faInstagram}/>
                                </Link>
                            </div>


                        </div>
                        
                    </div>
                </div>
               
            </div>
        </div>
  )
}

export default ActivityGrid