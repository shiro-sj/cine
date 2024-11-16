// Inspired by reciptify

'use client'
import { useState, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import MovieTicket from "../../../components/dynamicImages/movieTicket";
import FutureTicket from "../../../components/dynamicImages/futureTicket"

export default function Page() {

    const svgRef = useRef(null);

    const { user} = useUser();
    // const [movieTitle, setMovieTitle] = useState('');
    // const [watchedTime, setWatchTime] = useState('');
    const [movieStyle, setMovieStyle] = useState(true);
    const [reciptStyle, setReciptStyle] = useState(false);

    // const fetchTopMovie = async () => {
    //     try {
    //         const response = await axios.get('/api/stats/top');
    //         setMovieTitle(response.topWatched,title);
    //         setWatchTime(response.;
    //     } catch (error) {
    //         console.error('Error fetching watch history:', error);
    //     }
    // };
    // 
    // useEffect(() => {
    //     if (isSignedIn) fetchTopMovie();
 
    // }, [isSignedIn]);

    const handleDownload = async () => {
      const svgElement = svgRef.current;
      
      if (svgElement) {
        const htmlContent = svgElement.outerHTML;
        
        try {
          if (movieStyle) {
            const response = await fetch(`/api/svgDownload`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ htmlContent, width: 450, height: 600 }),
            });
    
            if (response.ok) {
              const blob = await response.blob();
              const url = URL.createObjectURL(blob);
    
              // Create a download link and click it to download the image
              const link = document.createElement('a');
              link.href = url;
              link.download = 'CineMovieTicket.png';
              link.click();
            }
          } else if (reciptStyle) {
            console.log('recipt style : ',movieStyle)

            const response = await fetch('/api/svgDownload', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ htmlContent, width : 620, height : 300 }),
            });
    
            if (response.ok) {
              const blob = await response.blob();
              const url = URL.createObjectURL(blob);
    
              // Create a download link and click it to download the image
              const link = document.createElement('a');
              link.href = url;
              link.download = 'CineMovieTicket.png';
              link.click();
            }
    
            // Revoke the object URL after download
            URL.revokeObjectURL(url);
          } else {
            console.error('Failed to generate image');
          }
        } catch (error) {
          console.error('Error downloading image:', error);
        }
      }
    };
    

    const handleMovieTicket = () =>{
        setMovieStyle(true);
        setReciptStyle(false);
    }
    const handleRecipt = () =>{
        setMovieStyle(false);
        setReciptStyle(true);
    }

    return (
        <div>
            
            <h1>Playground</h1>

             <div ref={svgRef}  style={{ backgroundColor:"#000000"}}>
                {movieStyle && <MovieTicket  movieTitle={'The Fast and the Furious: Tokyo Drift'} watchedDate={'24/03/04'} />}
                {reciptStyle && <FutureTicket user = {user} movieTitle ={"The Fast and the Furious: Tokyo Drift"} watchDate ={'24/03/04'}/>}
                
            </div> 


            <button onClick={handleDownload}>Download as PNG</button>

            <div>
                <button onClick = {handleMovieTicket}>Movie(Movie Ticket)</button>
                <button onClick = {handleRecipt}>TV Show(recipt)</button>
            </div>
            {/* <div>
                <button className="m-2" onClick={() => setTimeline('week')}>Week</button>
                <button className="m-2" onClick={() => setTimeline('month')}>Month</button>
                <button className="m-2" onClick={() => setTimeline('year')}>Year</button>
                <button className="m-2" onClick={() => setTimeline('decade')}>Decade</button>
            </div> */}
        </div>
    );
}
