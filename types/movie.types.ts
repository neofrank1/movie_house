export interface searchMovieQuery {
    s: string; // Search Title
}

export interface movieDetailsQuery {
    i: string; // Movie Title
}

export interface movieDetailsResponse {
    Title: string;
    Year: string;
    Ratings: [];
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Response: string;
}