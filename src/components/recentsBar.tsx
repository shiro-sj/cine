'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function RecentsBar() {
    const [recents, setRecents] = useState<any[]>([]);
    const [posters, setPosters] = useState<any>({}); 

    useEffect(() => {
        const fetchRecents = async () => {
            try {
                const results = await axios.get('/api/stats/recents');
                setRecents(results.data);
            } catch {
                console.log('Error fetching recents.');
            }
        };

        fetchRecents();
    }, []);

    const getPoster = async (id: number, type: string) => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/${type}/${id}`, {
                params: {
                    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
                },
            });
            if (response.data.poster_path) {
                
                const posterUrl = `https://image.tmdb.org/t/p/w500${response.data.poster_path}`;
                
                setPosters((prevPosters: any) => ({
                    ...prevPosters,
                    [id]: posterUrl,
                }));
            }
        } catch {
            console.log('Error fetching entry poster.');
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    useEffect(() => {
        recents.forEach((entry) => {
            if (entry.tmdbId && !posters[entry.tmdbId]) {
                // Fetch poster if not already fetched
                getPoster(entry.tmdbId, entry.type);
            }
        });
    }, [recents, posters]);

    return (
        <div>
            <h3>Recently Watched:</h3>
            <ul>
                {recents.map((entry) => (
                    <li key={entry.id}>
                        <div className='flex flex-row gap-10 items-center'>
                            <div>
                                {posters[entry.tmdbId] && (
                                    <img
                                        src={posters[entry.tmdbId]}
                                        alt={`${entry.title} poster`}
                                        style={{ width: '100px', height: 'auto' }}
                                        className='object-contain'
                                    />
                                )}
                            </div>
                            <div className='flex flex-col'>
                               <div>
                                {entry.title} : {entry.season} : {entry.episode} 
                                </div> 
                                <div>
                                {formatDate(entry.date.split('T')[0])}
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RecentsBar;
