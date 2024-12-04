import { entries, entriesOnGenre, genres, users } from "@/db/schema/users";
import { chunkArray } from "@/lib/helpers";
import { findEpisode, findMovie, findSeries, searchMovie, searchSeries } from "@/lib/tmdb";
import { db } from "@/db";
import { eq, and, SQLWrapper } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import OpenAI from 'openai';

export async function POST(request: Request) {

    const user = await currentUser();
    let dbUserId: number;    
    if (!user){
        return new Response('No user logged in', {status: 400})
    }

    try{
        const currentDbUser = await db.select({id: users.id, username: users.username}).from(users).where(eq(users.clerkId, user.id))
        if (currentDbUser.length > 0){
            dbUserId = currentDbUser[0].id
            try {
                const data = await request.json();
                const searchUrl = 'https://api.themoviedb.org/3/search';
                const findUrl = 'https://api.themoviedb.org/3'
                
            
                if (!data || data.length === 0) {
                  return new Response('No data found in the CSV.', { status: 400 });
                }
          
          
                // USE TO POPULATE GENRES TABLE
                //const genres = await getGenres()
          
                
              
              const batchSize = 100;
              const batches = chunkArray(data, batchSize);
              
          
              // Process each batch sequentially
              for (const batch of batches) {
                const processedBatch = await Promise.all(batch.map(async (entry: any) => {
                  const title = entry.Title;
                  const date = new Date(entry.Date);
          
                  if (title.includes(':')) {
                    const parts = title.split(':');
          
                    const showTitle = parts[0];
                    try {
                      let type: string | SQLWrapper;
                      const series = await searchSeries(searchUrl, showTitle);
                      if (series != null) {
                          type = 'tv'
                          const genresList: any[]=[];
                          let season;
                          let episode;
                          let details;
                          let runtime;
                          let seasonNumber;
                          let episodeDetails;

          
                          switch (parts.length){
                              case 2:
                                  details = await findSeries(findUrl, series.id.toString())
                                  episode = parts[1];
                                  episodeDetails = await findEpisode(findUrl, series.id.toString(), episode, '1')
                                  if (episodeDetails){
                                    runtime = episodeDetails.runtime
                                    season = null;
                                  } else{
                                    episodeDetails = await findEpisode(findUrl, series.id.toString(), episode, 'Specials')
                                    runtime = episodeDetails.runtime
                                    season = null;
                                  }
                                 
                                  break;
                              case 3:
                                  season = parts[1];
                                  seasonNumber = parts[1].trim().match(/\d+/)[0];
                                  episode = parts[2];
                                  episodeDetails = await findEpisode(findUrl, series.id.toString(), episode, seasonNumber)
                                  if (episodeDetails){
                                    runtime = episodeDetails.runtime
                                  } else{
                                    episodeDetails = await findEpisode(findUrl, series.id.toString(), episode, 'Specials')
                                    runtime = episodeDetails.runtime
                                  }
                                  break;
                              case 4:
                                  season = parts[1];
                                  episode = parts[2] + ':' + parts[3];
                                  runtime = null;
                                  break;
                          }

                          for (let genre of series.genres){
                              const result = await db.select().from(genres).where(and(eq(genres.genreID, genre), eq(genres.type, type)))
                              genresList.push(result[0].id)
                          }
          
                          const entry = {title: showTitle, date: date, userId: dbUserId, genres: genresList, seen: true, tmdbId: series.id, type: type, season: season, episode: episode, runtime: runtime}
          
                          try{
                              const [logged] = await db.insert(entries).values(entry).returning()
                              if(logged){
                                  const entryOnGenre = genresList.map((genre)=>({
                                      userId: dbUserId,
                                      entryId: logged.id,
                                      genreId: genre,
                                      type: entry.type,
                                      date: entry.date,
                                  }))
                                  const entryGenreLog = await db.insert(entriesOnGenre).values(entryOnGenre);
                              }
                              
                          } catch (error){
                              console.log('error sending data.', error)
                          }
                          //return { type: 'tv', title: showTitle,genres: genresList, id: series.id, date: date };
                      } else {
                          try{
                              let type;
                              const title = parts[0] + ':'+ parts[1]
                              const series = await searchSeries(searchUrl, title)
          
                              if (series != null){
                                  type = 'tv'
                                      const genresList: any[]=[];
                                      
                                      for (let genre of series.genres){
                                          const result = await db.select().from(genres).where(and(eq(genres.genreID, genre), eq(genres.type, type)))
                                          genresList.push(result[0].id)
                                      }
          
                                      const entry = {title: showTitle, date: date, userId: dbUserId, genres: genresList, seen: true, tmdbId: series.id, type: type}
          
                                      try{
                                          const [logged] = await db.insert(entries).values(entry).returning()
                                          if(logged){
                                              const entryOnGenre = genresList.map((genre)=>({
                                                
                                                  entryId: logged.id,
                                                  genreId: genre,
                                                  userId: dbUserId,
                                                  type: entry.type,
                                                  date: entry.date,
                                              }))
                                              const entryGenreLog = await db.insert(entriesOnGenre).values(entryOnGenre);
                                          }
                                          
                                      } catch (error){
                                          console.log('error sending data.', error)
                                      }
                                  //return {type: 'tv', title: title, genre: genresList, id: series.id, date: date}
                              } else{
          
                                  try {
          
          
                                      let type;
                                      const movie = await searchMovie(searchUrl, title)
                                      if (movie != null){
                                          type = 'movie'
                                          const genresList: any[]=[];
          
                                          for (let genre of movie.genres){
                                              const result = await db.select().from(genres).where(and(eq(genres.genreID, genre), eq(genres.type, type)))
                                              genresList.push(result[0].id)
                                          }
          
                                          const entry = {title: title, date: date, userId: dbUserId, genres: genresList, seen: true, tmdbId: movie.id, type: type }
          
                                          try{
                                              const [logged] = await db.insert(entries).values(entry).returning()
                                              if(logged){
                                                  const entryOnGenre = genresList.map((genre)=>({
                                                    
                                                      entryId: logged.id,
                                                      genreId: genre,
                                                      userId: dbUserId,
                                                      type: entry.type,
                                                      date: entry.date,
                                                  }))
                                                  const entryGenreLog = await db.insert(entriesOnGenre).values(entryOnGenre);
                                              }
                                              
                                          } catch (error){
                                              console.log('error sending data.', error)
                                          }
                                          //return {type: type, title: title, genres: genresList, id: movie.id, date: date}
                                      }
                                  }catch{
                                      return { type: null, title: title, id: null, date: date };
                                  }
                              }
                          }catch{
                              return { type: null, title: title, id: null, date: date };
                          }
                        
                      }
                    } catch (error) {
                        
                      return { type: null, title: title, id: null, date: date };
                    }
                  } else {
          
                    try {
                      let type;
                      const movie = await searchMovie(searchUrl, title);
                      
                      if (movie != null) {
                          type = 'movie'
                          const genresList: number[]=[];
                          const details = await findMovie(findUrl, movie.id.toString());
                          const runtime = details.runtime
                          
                          for (let genre of movie.genres){
                              const result = await db.select().from(genres).where(and(eq(genres.genreID, genre), eq(genres.type, type)))
                              genresList.push(result[0].id)
                          }


          
                      const entry = {title: title, date: date, userId: dbUserId, genres: genresList, seen: true, tmdbId: movie.id, type: type, runtime: runtime  }
          
                      try{
                          const [logged] = await db.insert(entries).values(entry).returning()
                          if(logged){
                              const entryOnGenre = genresList.map((genre)=>({
                                  entryId: logged.id,
                                  genreId: genre,
                                  userId: dbUserId,
                                  type: entry.type,
                                  date: entry.date,
                              }))
                              const entryGenreLog = await db.insert(entriesOnGenre).values(entryOnGenre);
                          }
                          
                      } catch (error){
                          console.log('error sending data.', error)
                      }
                      }
                    } catch {
                      return { type: null, title: title, id: null, date: date };
                    }
                  }
                }));
          
                console.log(processedBatch);
              }
                return new Response('File uploaded successfully!', { status: 200 });
              } catch (error) {
                  
                console.error('Error processing request:', error);
                return new Response(`${error}`, { status: 400 });
              }
        }

    }catch{
        return new Response('No user with this id.', {status: 400})
    }
    
  }
  