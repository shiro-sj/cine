'use client'
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Button } from "@nextui-org/react";
import MovieTicket from './dynamicImages/MovieTicket';
import FutureTicket from './dynamicImages/FutureTicket';
import ConcertTicket from './dynamicImages/ConcertTicket';

export default function Page() {

    const svgRef = useRef(null);

    const { user, isSignedIn } = useUser();
    const [movieTitle, setMovieTitle] = useState('');
    const [watchedTime, setWatchTime] = useState('');
    const [ticketStyle, setTicketStyle] = useState('cinama'); // Default style

    const fetchTopMovie = async () => {
        try {
            const response = await axios.get('/api/stats/top');
            if (response.data?.topWatched?.[0]) {
                const topMovie = response.data.topWatched[0];
                setMovieTitle(topMovie.title);
                setWatchTime(topMovie.entriesCount);
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
            const dimensions = {
                cinama: { width: 450, height: 600 },
                futuristic: { width: 620, height: 300 },
                concert: { width: 1000, height: 300 },
            };

            try {
                const { width, height } = dimensions[ticketStyle] || {};
                const response = await fetch('/api/svgDownload', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ htmlContent, width, height }),
                });

                if (response.ok) {
                    const blob = await response.blob();
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'CineTicket.png';
                    link.click();
                    URL.revokeObjectURL(url);
                } else {
                    console.error('Failed to generate image');
                }
            } catch (error) {
                console.error('Error downloading image:', error);
            }
        }
    };

    const handleMovieTicket = () => setTicketStyle('cinama');
    const handleFuture = () => setTicketStyle('futuristic');
    const handleConcert = () => setTicketStyle('concert');

    return (
        <div className="main-div flex flex-col items-center justify-center h-screen bg-gray-100">
            {/* Header */}
            <div className="w-full flex justify-center">
                <h1 className="p-5 text-5xl">Playground</h1>
            </div>

            {/* Content */}
            <div className="content-h flex w-full max-w-5xl">
                {/* Left Section: Ticket and Download */}
                <div className="flex flex-col justify-center items-center flex-1 bg-white shadow p-8 rounded">
                    <div ref={svgRef}>
                        {ticketStyle === 'cinama' && (
                            <MovieTicket movieTitle={movieTitle} watchedDate={watchedTime} />
                        )}
                        {ticketStyle === 'futuristic' && (
                            <FutureTicket user={user} movieTitle={movieTitle} watchDate={watchedTime} />
                        )}
                        {ticketStyle === 'concert' && (
                            <ConcertTicket user={user} movieTitle='The Hunger Games' watchDate={watchedTime} />
                        )}
                    </div>
                    <div className="pt-8">
                        <Button variant="ghost" onClick={handleDownload}>
                            Download as PNG
                        </Button>
                    </div>
                </div>

                {/* Right Section: Style Buttons */}
                <div className="flex flex-col justify-center items-center gap-5 ml-10">
                    <h3 className="text-xl font-semibold">Select Style</h3>
                    <Button onClick={handleMovieTicket}>Cinema</Button>
                    <Button onClick={handleFuture}>Futuristic</Button>
                    <Button onClick={handleConcert}>Concert</Button>
                </div>
            </div>
        </div>
    );
}
