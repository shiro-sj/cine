import { db } from "@/db";
import { genres } from "@/db/schema/users";
import axios from "axios";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export async function searchSeries(searchUrl: string, title: string) {
  try {
    const response = await axios.get(`${searchUrl}/tv`, {
      params: {
        api_key: TMDB_API_KEY,
        query: title,
      },
    });

    if (!response.data.results || response.data.results.length === 0) {
      return null; 
    }

    for (let result of response.data.results) {
      if (
        title === result.name || 
        title === result.original_name
      ) {
        return {id: result.id, overview: result.overview, genres: result.genre_ids};
      }
    }

    return null;

  } catch (e) {
    console.error(`Error fetching series ID for "${title}":`, e);
    return null;
  }
}

export async function searchMovie(searchUrl: string, title: string) {
  try {
    const response = await axios.get(`${searchUrl}/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        query: title,
      },
    });

    if (!response.data.results || response.data.results.length === 0) {
      return null; 
    }

    return {id: response.data.results[0].id, overview: response.data.results[0].overview, genres: response.data.results[0].genre_ids};

  } catch (e) {
    console.error(`Error fetching movie ID for "${title}":`, e);
    return null;
  }
}

export async function getGenres(){
    const genreUrl = 'https://api.themoviedb.org/3/genre'
    const types = ['movie','tv']

    try{
        await db.delete(genres)
        for (let type of types){
            try{
                const response = await axios.get(`${genreUrl}/${type}/list`,{
                    params:{
                        api_key: TMDB_API_KEY,
                        language: 'en'
                    }
                })
                if (response!= null){
                    for (let genre of response.data.genres){
                        try{
                            await db.insert(genres).values({genreID:genre.id, name: genre.name, type: type } )
                        } catch{
                            console.log('error populating db with genres.')
                        } 
                    }
                }
                return 'Genres fetched and inserted successfully';
            }catch (error){
                console.log('error fetching genres', error)
            }
        }
    } catch{
        console.log('error resetting genres.')
    }
}
