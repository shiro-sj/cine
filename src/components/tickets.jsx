'use client'
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Button } from "@nextui-org/react";
import MovieTicket from './dynamicImages/MovieTicket';
import FutureTicket from './dynamicImages/FutureTicket';

export default function Page() {

    const svgRef = useRef(null);

    const { user, isSignedIn } = useUser();
    const [movieTitle, setMovieTitle] = useState('');
    const [watchedTime, setWatchTime] = useState('');
    const [movieStyle, setMovieStyle] = useState(true);
    const [reciptStyle, setReciptStyle] = useState(false);

    const fetchTopMovie = async () => {
        try {
            const response = await axios.get('/api/stats/top');
            if (response.data && response.data.topWatched && response.data.topWatched[0]) {
                const topMovie = response.data.topWatched[0]; // get the top watched movie
                setMovieTitle(topMovie.title);  // Update movie title
                setWatchTime(topMovie.entriesCount);  // Update watch count
            }
        } catch (error) {
            console.error('Error fetching watch history:', error);
        }
    };
    
    useEffect(() => {
        if (isSignedIn) {
            fetchTopMovie();
        }
    }, [isSignedIn]);

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
    
              const link = document.createElement('a');
              link.href = url;
              link.download = 'CineMovieTicket.png';
              link.click();
            }
          } else if (reciptStyle) {
            const response = await fetch('/api/svgDownload', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ htmlContent, width: 620, height: 300 }),
            });
    
            if (response.ok) {
              const blob = await response.blob();
              const url = URL.createObjectURL(blob);
    
              const link = document.createElement('a');
              link.href = url;
              link.download = 'CineMovieTicket.png';
              link.click();
              
              URL.revokeObjectURL(url);
            }
          } else {
            console.error('Failed to generate image');
          }
        } catch (error) {
          console.error('Error downloading image:', error);
        }
      }
    };
    

    const handleMovieTicket = () => {
        setMovieStyle(true);
        setReciptStyle(false);
    };

    const handleRecipt = () => {
        setMovieStyle(false);
        setReciptStyle(true);
    };

    return (
        <div className='main-div'>
          <div className="w-full  flex justify-center">
          <h1 className="p-5 text-5xl">Playground</h1>

          </div>
          
          <div className="content-h">
          <div className='flex flex-col justify-center items-center flex-1'>
                <div ref={svgRef}>
                    {movieStyle && (
                        <MovieTicket movieTitle={movieTitle} watchedDate={watchedTime} />
                    )}
                    {reciptStyle && (
                        <FutureTicket user={user} movieTitle={movieTitle} watchDate={watchedTime} />
                    )}
                </div>

                <div className="p-8">
                <Button variant="ghost" onClick={handleDownload}>Download as PNG</Button>

                </div>

                
            </div>

            {/* Right side container (Buttons stacked on top of each other) */}
            <div className="bg-white flex flex-col justify-center items-center gap-20 flex-1">
                <Button onClick={handleMovieTicket}>Movie(Movie Ticket)</Button>
                <Button onClick={handleRecipt}>TV Show(Receipt)</Button>
            </div>

          </div>
        </div>
    );
}

// CSS Styles
// const styles = {
//     mainContainer: {
//         display: 'flex',
//         justifyContent: 'center', // Center horizontally
//         alignItems: 'center',     // Center vertically
//         height: '100vh',
//         padding: '100px'        // Full viewport height
//     },
//     contentContainer: {
//         display: 'flex',
//         flexDirection: 'column', // Stack elements vertically
//         alignItems: 'center',    // Center content horizontally
//         marginRight: '20px',     // Space between ticket and buttons
//     },
//     ticketContainer: {
//         backgroundColor: "#000000",
//         marginBottom: '20px',    // Space between ticket and download button
//     },
//     buttonContainer: {
//         display: 'flex',
//         flexDirection: 'column', // Stack buttons vertically
//         alignItems: 'flex-start', // Align buttons to the left of the container (right side of the ticket)
//         justifyContent: 'center', // Center vertically within the button container
//     },
//     button: {
//         marginBottom: '10px',     // Space between buttons
//     },
//     downloadButton: {
//         marginTop: '10px',        // Space between ticket and download button
//     }
// };
