import { db } from '@/db';
import { entries, users } from '@/db/schema/users';
import { eq, gte, and, desc, max } from "drizzle-orm";
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
    async function getPoster(tmdbId: number, type: string) {
        const url = `https://api.themoviedb.org/3/${type}/${tmdbId}`;
        const posterUrl = `https://image.tmdb.org/t/p/w500`;

        try {
            
            const response = await axios.get(url, {
                params: {
                    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
                },
            });

            return {
                poster: response.data.poster_path ? `${posterUrl}${response.data.poster_path}` : null,
                backdrop: response.data.backdrop_path ? `${posterUrl}${response.data.backdrop_path}` : null,
            };
        } catch (error) {
            console.error('Failed to fetch TMDB data:', error);
            return {
                posterUrl: null,
                backdropUrl: null,
            };
        }
    }

    try {
        const url = new URL(request.url);
        const username = url.searchParams.get("username");
        const setback = 1;

        if (username) {
            const comparisonDate = new Date();
            comparisonDate.setMonth(comparisonDate.getMonth() - setback);

            const dbUser = await db.select().from(users).where(eq(users.username, username));
            const results = await db
                .selectDistinct({
                    tmdbId: entries.tmdbId,
                    title: entries.title,
                    date: max(entries.date),
                    type: max(entries.type),
                })
                .from(entries)
                .where(and(eq(entries.userId, dbUser[0].id), gte(entries.date, comparisonDate)))
                .orderBy(desc(max(entries.date)))
                .groupBy(entries.tmdbId, entries.title);

            const enrichedResults = await Promise.all(results.map(async (entry) => {
                const { tmdbId, type } = entry;
                try {
                    if (tmdbId && type) {
                        const { poster, backdrop } = await getPoster(tmdbId, type);
                        return {
                            ...entry,
                            poster,
                            backdrop,
                        };
                    }
                } catch (error) {
                    console.error(`Error fetching details for TMDB ID ${tmdbId}:`, error);
                    return entry; // Return original entry if error occurs
                }
            }));

            return NextResponse.json(enrichedResults);
        } else {
            return new NextResponse('User not authenticated', { status: 401 });
        }
    } catch (error) {
        console.error('Error fetching recents:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}
