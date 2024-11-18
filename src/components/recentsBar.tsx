'use client'
import { Table, Avatar, TableHeader, TableBody, TableCell, TableColumn, TableRow, Image} from '@nextui-org/react'
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
                getPoster(entry.tmdbId, entry.type);
            }
        });
    }, [recents, posters]);

    return (
        <div className="p-4 flex w-full h-full flex-col">
            <h3 className="text-xl font-semibold mb-4">Recently Watched:</h3>
            <Table aria-label="Recently Watched" className='flex-1 flex overflow-scroll scrollbar-hide rounded-lg' color='secondary'>
                <TableHeader className='flex overflow-scroll scrollbar-hide'>
                    <TableColumn>Poster</TableColumn>
                    <TableColumn>Title</TableColumn>
                    <TableColumn>Season</TableColumn>
                    <TableColumn>Episode</TableColumn>
                    <TableColumn>Date Watched</TableColumn>
                </TableHeader>
                <TableBody className='flex overflow-scroll scrollbar-hide'>
                    {recents.map((entry) => (
                        <TableRow key={entry.id} className="transition-colors duration-200 hover:bg-gray-100">
                            <TableCell>
                                {posters[entry.tmdbId] && (
                                    <Image
                                        src={posters[entry.tmdbId]}
                                        alt={`${entry.title} poster`}
                                        sizes="lg"
                                        className="w-16 h-auto"
                                    />
                                )}
                            </TableCell>
                            <TableCell>{entry.title}</TableCell>
                            <TableCell>{entry.season}</TableCell>
                            <TableCell>{entry.episode}</TableCell>
                            <TableCell>{formatDate(entry.date.split('T')[0])}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default RecentsBar;
