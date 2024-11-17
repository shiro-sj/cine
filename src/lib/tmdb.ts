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

export async function findMovie(findUrl:string, id:string|null){
  try{
      const response = await axios.get(`${findUrl}/movie/${id}`, {
      params:{
          api_key: TMDB_API_KEY
      }
      })
      return response.data;
  
  }catch(e){
      console.log(`Error fetching movie data for ${id}`, e)
  }
};


export async function findSeries(findUrl:String, id:string |null){
  try{
      const response = await axios.get(`${findUrl}/tv/${id}`, {
      params:{
          api_key: TMDB_API_KEY
      }
      })
      return response.data;
  
  }catch(e){
      console.log(`Error finding series data for ${id}`, e)
  }
  
  };

  export function jaccardCompare(str1: string, str2: string){
    let string1 = str1.toLowerCase().split(/\W+/)
    let string2 = str2.toLowerCase().split(/\W+/)
    let intersection = new Set([...string1].filter(x=>string2.includes(x)));
    let union = new Set([...string1, ...string2]);

    let similarity = intersection.size / union.size;

    return similarity;
}

  export async function findEpisode(findUrl:String, id:string | null, episodeName:string, season: string|null){
    try {
        const response = await axios.get(`${findUrl}/tv/${id}/season/${season}`,{
        params:{
            api_key: TMDB_API_KEY
        }
        })
    
        for (let episodeNumber in response.data.episodes){
        let name = response.data.episodes[episodeNumber].name
        const index = jaccardCompare(name, episodeName);
        if (index>=0.5){
            return response.data.episodes[episodeNumber];
        }
        }
    
    } catch (error) {
        console.log(`Error finding ${id} season: ${season} : ${episodeName} `)
        
    }
    }