export interface searchMovieQuery {
    s: string; // Search Title
}

export interface MoviePreview {
    imdbID: string;
    Title: string;
    Year: string;
    Type: string;
    Poster: string;
}

export interface SearchResponse {
    Search: MoviePreview[];
    totalResults: string;
    imdbID?: string;
}

export interface movieDetailsQuery {
    i: string; // Movie Title
}

export interface movieDetailsResponse {
   Title: string;
    Poster: string;
    Ratings: Array<{ Source: string; Value: string }>;
    imdbRating: string;
    imdbVotes: string;
    Metascore: string;
    Year: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Released: string;
    Runtime: string;
    Rated: string;
    Language: string;
    Country: string;
    Awards: string;
    Plot: string;
    Response: string;
}