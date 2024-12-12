import { RecentMainProps } from '@/lib/interfaces'
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'

function RecentsBar({recentEntries}:RecentMainProps) {
  return (
    <div className="h-[20vh] max-w-full flex gap-4">
    {recentEntries.map((recent)=>
      <div key={recent.tmdbId} className="w-1/4 flex-shrink-0">
      <Card className="max-w-full h-full">
        <CardBody className="scrollbar-hide p-0">
          <div className="w-full max-h-full">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={recent.title}
              src={recent.backdrop}
              className="object-cover"
            />
          </div>  
        </CardBody>
        <CardFooter className="max-w-full ">
          <div className="flex flex-col justify-start items-start text-xs">
            <b>{recent.title}</b>
            {/*<p>{recent.date}</p>*/}
          </div>
        </CardFooter>
      </Card>
    </div>
  )}
  </div>
  )
}

export default RecentsBar