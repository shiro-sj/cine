import { entries, entriesOnGenre, genres, users } from "@/db/schema/users";
import { chunkArray } from "@/lib/helpers";
import { findEpisode, findMovie, searchMovie, searchSeries } from "@/lib/tmdb";
import { db } from "@/db";
import { eq, and, SQLWrapper } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(request: Request) {
    const user = await currentUser();
    let dbUserId: number;    
    if (!user) {
        return new Response('No user logged in', { status: 400 });
    }

    try {
        const currentDbUser = await db.select({ id: users.id, username: users.username })
            .from(users)
            .where(eq(users.clerkId, user.id));

        const deleteEntriesOnGenre = await db.delete(entriesOnGenre)
            .where(eq(entriesOnGenre.userId, currentDbUser[0].id));
        console.log(deleteEntriesOnGenre)

        const deleteEntries = await db.delete(entries)
            .where(eq(entries.userId, currentDbUser[0].id));
        console.log(deleteEntries)

        if (currentDbUser.length > 0) {
            dbUserId = currentDbUser[0].id;

            try {
                const data = await request.json();
                const searchUrl = 'https://api.themoviedb.org/3/search';
                const findUrl = 'https://api.themoviedb.org/3';

                if (!data || data.length === 0) {
                    return new Response('No data found in the CSV.', { status: 400 });
                }

                const batchSize = 100;
                const batches = chunkArray(data, batchSize);

                // Process each batch sequentially
                for (const batch of batches) {
                    // Explicitly type the batch to { Title: string; Date: string }[]
                    await Promise.all((batch as { Title: string; Date: string }[]).map(async (entry) => {
                        const title = entry.Title;
                        const date = new Date(entry.Date);

                        // Process TV shows (if title contains ':')
                        if (title.includes(':')) {
                            const parts = title.split(':');
                            const showTitle = parts[0];
                            const type: string | SQLWrapper = 'tv'; // Change 'let' to 'const'

                            try {
                                const series = await searchSeries(searchUrl, showTitle);

                                if (series) {
                                    const genresList: number[] = [];
                                    let runtime: number | null = null;
                                    let season: string | null = null;
                                    let episode: string | null = null;

                                    switch (parts.length) {
                                        case 2:
                                            const episodeDetails = await findEpisode(findUrl, series.id.toString(), parts[1], '1');
                                            runtime = episodeDetails?.runtime || null;
                                            break;
                                        case 3:
                                            season = parts[1];
                                            episode = parts[2];
                                            break;
                                        case 4:
                                            season = parts[1];
                                            episode = parts[2] + ':' + parts[3];
                                            break;
                                    }

                                    // Handle genre association for TV shows
                                    for (const genre of series.genres) {
                                        const result = await db.select().from(genres)
                                            .where(and(eq(genres.genreID, genre), eq(genres.type, type)));
                                        genresList.push(result[0].id);
                                    }

                                    // Insert the entry into the database
                                    const entryData = {
                                        title: showTitle,
                                        date,
                                        userId: dbUserId,
                                        genres: genresList,
                                        seen: true,
                                        tmdbId: series.id,
                                        type,
                                        season,
                                        episode,
                                        runtime
                                    };

                                    const [logged] = await db.insert(entries).values(entryData).returning();
                                    if (logged) {
                                        // Insert the genres associated with the entry
                                        const entryOnGenre = genresList.map(genre => ({
                                            userId: dbUserId,
                                            entryId: logged.id,
                                            genreId: genre,
                                            type: entryData.type,
                                            date: entryData.date
                                        }));

                                        await db.insert(entriesOnGenre).values(entryOnGenre);
                                    }
                                }
                            } catch (error) {
                                console.error('Error processing series entry:', error);
                            }
                        } else {
                            // Process Movies (no ':' in title)
                            try {
                                const movie = await searchMovie(searchUrl, title);

                                if (movie) {
                                    const genresList: number[] = [];
                                    const details = await findMovie(findUrl, movie.id.toString());
                                    const runtime = details.runtime;

                                    // Handle genre association for movies
                                    for (const genre of movie.genres) {
                                        const result = await db.select().from(genres)
                                            .where(and(eq(genres.genreID, genre), eq(genres.type, 'movie')));
                                        genresList.push(result[0].id);
                                    }

                                    // Insert the entry into the database
                                    const entryData = {
                                        title,
                                        date,
                                        userId: dbUserId,
                                        genres: genresList,
                                        seen: true,
                                        tmdbId: movie.id,
                                        type: 'movie',
                                        runtime
                                    };

                                    const [logged] = await db.insert(entries).values(entryData).returning();
                                    if (logged) {
                                        // Insert the genres associated with the movie entry
                                        const entryOnGenre = genresList.map(genre => ({
                                            userId: dbUserId,
                                            entryId: logged.id,
                                            genreId: genre,
                                            type: entryData.type,
                                            date: entryData.date
                                        }));

                                        await db.insert(entriesOnGenre).values(entryOnGenre);
                                    }
                                }
                            } catch (error) {
                                console.error('Error processing movie entry:', error);
                            }
                        }
                    }));
                }

                return new Response('File uploaded successfully!', { status: 200 });
            } catch (error) {
                console.error('Error processing request:', error);
                return new Response(`${error}`, { status: 400 });
            }
        }
    } catch {
        return new Response('No user with this id.', { status: 400 });
    }
}
