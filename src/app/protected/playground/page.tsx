'use client'
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import MovieTicket from "../../../components/dynamicImages/movieTicket";
import FutureTicket from "../../../components/dynamicImages/futureTicket";

export default function Page() {

    const svgRef = useRef(null);

    const { user, isSignedIn } = useUser();
    const [movieTitle, setMovieTitle] = useState('');
    const [watchedTime, setWatchTime] = useState('');
    const [movieStyle, setMovieStyle] = useState(true);
    const [reciptStyle, setReciptStyle] = useState(false);

    const fetchTopMovie = async () => {
        try {
            // Make an API request to fetch top watched movie data
            const response = await axios.get('/api/stats/top');
            // Assuming 'topWatched' is an array and contains the movie data
            if (response.data && response.data.topWatched && response.data.topWatched[0]) {
                const topMovie = response.data.topWatched[0]; // get the top watched movie
                setMovieTitle(topMovie.title);  // Update movie title
                setWatchTime(topMovie.entriesCount);  // Update watch count
            }
        } catch (error) {
            console.error('Error fetching watch history:', error);
        }
    };
    
    // Trigger fetching top movie data when signed in
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
    
              // Create a download link and click it to download the image
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
    
              // Create a download link and click it to download the image
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
        <div>
            <h1>Playground</h1>

            <div ref={svgRef} style={{ backgroundColor: "#000000" }}>
                {movieStyle && (
                    <MovieTicket movieTitle={movieTitle} watchedDate={watchedTime} />
                )}
                {reciptStyle && (
                    <FutureTicket user={user} movieTitle={movieTitle} watchDate={watchedTime} />
                )}
            </div>

            <button onClick={handleDownload}>Download as PNG</button>

            <div>
                <button onClick={handleMovieTicket}>Movie(Movie Ticket)</button>
                <button onClick={handleRecipt}>TV Show(Receipt)</button>
            </div>
        </div>
    );
}
