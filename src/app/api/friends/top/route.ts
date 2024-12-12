
import { db } from "@/db";
import { entries, entriesOnGenre, genres, users } from "@/db/schema/users";
import { eq, count, desc, countDistinct } from 'drizzle-orm'
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request){
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
        
    try{
        const url = new URL(request.url);
        const username = url.searchParams.get("username");
        

        if (username){
            const dbUser  = await db.select().from(users).where(eq(users.username, username));

            if (dbUser .length === 0) {
                return new Response('User  not found', { status: 404 });
            }

            const topWatched = await db.select({ id: entries.tmdbId, type: entries.type, title: entries.title, entriesCount: countDistinct(entries.id) })
                .from(entries)
                .leftJoin(users, eq(entries.userId, users.id))
                .where(eq(users.id, dbUser[0].id))
                .groupBy(entries.tmdbId, entries.title, entries.type)
                .orderBy(desc(count(entries.id)));

            const topGenres = await db.select({ genreId: entriesOnGenre.genreId, type: genres.type, name: genres.name, count: count(entriesOnGenre.id) })
                .from(entriesOnGenre)
                .leftJoin(genres, eq(entriesOnGenre.genreId, genres.id))
                .leftJoin(users, eq(entriesOnGenre.userId, users.id))
                .where(eq(users.id, dbUser[0].id))
                .groupBy(entriesOnGenre.genreId, genres.name, genres.type)
                .orderBy(desc(count(entriesOnGenre.id)));

            const enrichedResults = await Promise.all(topWatched.map(async (entry) => {
                const { id, type } = entry;
                try {
                    if (id && type) {
                        const { poster, backdrop } = await getPoster(id, type);
                        return {
                            ...entry,
                            poster,
                            backdrop,
                        };
                    }
                } catch (error) {
                    console.error(`Error fetching details for TMDB ID ${id}:`, error);
                    return entry; // Return original entry if error occurs
                }
            }));

            return NextResponse.json({ topWatched: enrichedResults, topGenres: topGenres });
        } else{
            return new Response('error processing top watched', {status: 500})
        }

    }catch (error){
        return new Response(`Error processing statistics: ${error}`, {status: 500})
    }
}