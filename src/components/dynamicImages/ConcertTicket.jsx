import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ConcertTicket({ movieTitle = "Unknown", watchedDate = "N/A", posterURL }) {
    // State to store the fetched movie details
    const [movieData, setMovieData] = useState(null);

    
    // Function to fetch movie/show data from TMDb
    const fetchMovieData = async () => {
        if (!movieTitle) return; // Do nothing if no movieTitle is provided

        try {
            // Request to TMDb API to search for the movie/show by title
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
                params: {
                    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
                    query: movieTitle,
                    language: 'en-US',
                    page: 1,
                }
            });

            if (response.data.results && response.data.results.length > 0) {
                // Set the first result to the state (you can customize it to display more)
                console.log(response.data.results)
                setMovieData(response.data.results[0]);
            } else {
                console.log("No results found for:", movieTitle);
            }
        } catch (error) {
            console.error("Error fetching data from TMDb:", error);
        }
    };

    // Call the fetchMovieData function when the component mounts or movieTitle changes
    useEffect(() => {
        fetchMovieData();
    }, [movieTitle]); // Re-fetch if movieTitle changes

    return (
        <svg
            width="1000"
            height="300"
            viewBox="0 0 720 300"
            xmlns="http://www.w3.org/2000/svg"
            style={{ backgroundColor: 'fffff1' }}
        >
            <defs>
                <mask id="bottom-half-circle-mask">
                    <rect x="520" y="265" width="900" height="100" fill="white" />
                </mask>
            </defs>
            <defs>
                <mask id="top-half-circle-mask">
                    <rect x="520" y="0" width="900" height="100" fill="white" />
                </mask>
            </defs>

            {/* Background Image */}
            {posterURL && (
                <image
                    href={posterURL}
                    x="0"
                    y="0"
                    width="620"
                    height="300"
                    preserveAspectRatio="none"
                    opacity="0.25"
                />
            )}

            {/* Ticket Text */}
            <text x="100" y="50" fontSize="18" fill="#666">
                EVENT TICKET
            </text>
            <text x="100" y="90" fontSize="40" fontWeight="bold" fill="#333">
                {movieTitle}
            </text>
            <text x="100" y="217" fontSize="18" fill="#666">
                Watched {watchedDate} Times
            </text>
            <text x="417" y="217" fontSize="18" fill="#666">
                11-19-2026
            </text>
            <text x="100" y="260" fontSize="18" fill="#666">
                cine.com
            </text>
            <text x="450" y="260" fontSize="18" fill="#666">
                8:30pm
            </text>

            <text x="-65" y="610" fontSize="15" fill="black" transform="rotate(270, 100, 100)">
                AUD 9
            </text>
            <text x="22" y="610" fontSize="15" fill="black" transform="rotate(270, 100, 100)">
                ROW 2
            </text>
            <text x="110" y="610" fontSize="15" fill="black" transform="rotate(270, 100, 100)">
                SEAT 5
            </text>

            <text x="110" y="677" fontSize="40" fill="black" fontWeight="bolder"transform="rotate(270, 100, 100)">
                01
            </text>
            <text x="22" y="677" fontSize="40" fill="black" fontWeight="bolder" transform="rotate(270, 100, 100)">
                02
            </text>
            <text x="-65" y="677" fontSize="40" fill="black" fontWeight="bolder" transform="rotate(270, 100, 100)">
                03
            </text>
            <text x="-70" y="810" fontSize="12" fill="black" transform="rotate(270, 100, 100)">
                Ticket Number
            </text>
            <text x="110" y="810" fontSize="12" fill="black" transform="rotate(270, 100, 100)">
                7238491          
            </text>
            <text x="-5" y="-70" fontSize="15" fill="black" transform="rotate(270, 100, 100)">
                Ticket Price
            </text>
            <text x="-35" y="-10" fontSize="50" fill="black" transform="rotate(270, 100, 100)">
                $12.39
            </text>
            
            

            {/* Decorative Border or Elements */}
            <line x1="75" y1="0" x2="75" y2="300" stroke="black" strokeWidth="2" />
            <line x1="75" y1="190" x2="540" y2="190" stroke="black" strokeWidth="2" />
            <line x1="75" y1="233" x2="540" y2="233" stroke="black" strokeWidth="2" />
            <line x1="75" y1="275" x2="540" y2="275" stroke="black" strokeWidth="2" />

            <line x1="350" y1="190" x2="350" y2="300" stroke="black" strokeWidth="2" />

            <line x1="700" y1="30" x2="700" y2="270" stroke="black" strokeWidth="2" />
            <line x1="630" y1="30" x2="630" y2="270" stroke="black" strokeWidth="2" />

            <line x1="25" y1="30" x2="25" y2="270" stroke="black" strokeWidth="2" />
            <line x1="-90" y1="30" x2="-90" y2="270" stroke="black" strokeWidth="2" />



            <g transform="rotate(270, 765,250)">
            <rect x="750" y="210" width="2" height="60" fill="black" />
            <rect x="753" y="210" width="1" height="60" fill="black" />
            <rect x="755" y="210" width="2" height="60" fill="black" />
            <rect x="759" y="210" width="4" height="60" fill="black" />
            <rect x="765" y="210" width="2" height="60" fill="black" />
            <rect x="770" y="210" width="3" height="60" fill="black" />
            <rect x="775" y="210" width="1" height="60" fill="black" />
            <rect x="778" y="210" width="2" height="60" fill="black" />
            <rect x="782" y="210" width="3" height="60" fill="black" />
            <rect x="788" y="210" width="1" height="60" fill="black" />
            <rect x="791" y="210" width="4" height="60" fill="black" />
            <rect x="797" y="210" width="2" height="60" fill="black" />
            <rect x="801" y="210" width="2" height="60" fill="black" />
            <rect x="805" y="210" width="3" height="60" fill="black" />
            <rect x="810" y="210" width="2" height="60" fill="black" />
            <rect x="814" y="210" width="1" height="60" fill="black" />
            <rect x="817" y="210" width="3" height="60" fill="black" />
            <rect x="822" y="210" width="2" height="60" fill="black" />
            <rect x="826" y="210" width="4" height="60" fill="black" />
            <rect x="832" y="210" width="1" height="60" fill="black" />
            <rect x="835" y="210" width="3" height="60" fill="black" />
            <rect x="840" y="210" width="2" height="60" fill="black" />
            <rect x="844" y="210" width="1" height="60" fill="black" />
            <rect x="847" y="210" width="2" height="60" fill="black" />
            <rect x="851" y="210" width="3" height="60" fill="black" />
            <rect x="856" y="210" width="2" height="60" fill="black" />
            <rect x="860" y="210" width="2" height="60" fill="black" />
            <rect x="865" y="210" width="3" height="60" fill="black" />
            <rect x="870" y="210" width="2" height="60" fill="black" />
            <rect x="875" y="210" width="1" height="60" fill="black" />
            <rect x="878" y="210" width="4" height="60" fill="black" />
            <rect x="883" y="210" width="2" height="60" fill="black" />
            <rect x="887" y="210" width="1" height="60" fill="black" />
            <rect x="890" y="210" width="3" height="60" fill="black" />
            <rect x="895" y="210" width="2" height="60" fill="black" />
            <rect x="900" y="210" width="1" height="60" fill="black" />
            <rect x="903" y="210" width="3" height="60" fill="black" />
            <rect x="908" y="210" width="2" height="60" fill="black" />
            <rect x="912" y="210" width="1" height="60" fill="black" />
            <rect x="915" y="210" width="3" height="60" fill="black" />
            <rect x="920" y="210" width="2" height="60" fill="black" />
            <rect x="925" y="210" width="4" height="60" fill="black" />
            <rect x="930" y="210" width="1" height="60" fill="black" />
            <rect x="935" y="210" width="3" height="60" fill="black" />
            <rect x="940" y="210" width="2" height="60" fill="black" />
            <rect x="945" y="210" width="1" height="60" fill="black" />
            <rect x="948" y="210" width="3" height="60" fill="black" />
            <rect x="953" y="210" width="2" height="60" fill="black" />
            <rect x="957" y="210" width="4" height="60" fill="black" />
            <rect x="962" y="210" width="1" height="60" fill="black" />
            <rect x="965" y="210" width="3" height="60" fill="black" />
            <rect x="970" y="210" width="2" height="60" fill="black" />
            <rect x="975" y="210" width="1" height="60" fill="black" />
            <rect x="978" y="210" width="2" height="60" fill="black" />

            </g>




            <circle cx="550" cy="300" r="20" fill="black" mask="url(#bottom-half-circle-mask)" />
            <circle cx="550" cy="0" r="20" fill="black" mask="url(#top-half-circle-mask)" />

            <circle cx="550" cy="40" r="3" fill="black" />
            <circle cx="550" cy="60" r="3" fill="black" />
            <circle cx="550" cy="80" r="3" fill="black" />
            <circle cx="550" cy="100" r="3" fill="black" />
            <circle cx="550" cy="120" r="3" fill="black" />
            <circle cx="550" cy="140" r="3" fill="black" />
            <circle cx="550" cy="160" r="3" fill="black" />
            <circle cx="550" cy="180" r="3" fill="black" />
            <circle cx="550" cy="200" r="3" fill="black" />
            <circle cx="550" cy="220" r="3" fill="black" />
            <circle cx="550" cy="240" r="3" fill="black" />
            <circle cx="550" cy="260" r="3" fill="black" />

            
            


            {/* Display fetched movie data (poster and description) */}
            {movieData && (
                <>
                    <image
                        href={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
                        x="-140"
                        y="0"
                        width="200"
                        height="300"
                    />
                </>
            )}
        </svg>
    );
}
