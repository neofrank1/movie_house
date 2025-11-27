import axios from "axios";
import { searchMovieQuery, movieDetailsQuery } from "@/types/movie.types";

export default async function searchMovie(searchMovieQuery: searchMovieQuery) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY || "";
    const apiUrl = process.env.NEXT_PUBLIC_OMDB_API_URL || "http://www.omdbapi.com";
    const response = await axios.get(`${apiUrl}/?apikey=${apiKey}&`, {
      params: searchMovieQuery,
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    return response.data;
  } catch (error) {
    console.error("Error searching for movie:", error);
    throw error;
  }
}

export async function getMovieDetails(movieDetailsQuery: movieDetailsQuery) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY || "";
    const apiUrl = process.env.NEXT_PUBLIC_OMDB_API_URL || "http://www.omdbapi.com";
    const response = await axios.get(`${apiUrl}/?apikey=${apiKey}&`, {
      params: movieDetailsQuery,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting movie details:", error);
    return null;
  }
}