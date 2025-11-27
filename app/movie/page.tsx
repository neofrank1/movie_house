"use client";

import AppLayout from "@/components/layout/app-layout";
import { useEffect, useState } from "react";
import { Card } from "@/components/retroui/Card";
import { Button } from "@/components/retroui/Button";
import { Text } from "@/components/retroui/Text";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/retroui/Loader";

interface Movie {
    imdbID: string;
    Title: string;
    Year: string;
    Type: string;
    Poster: string;
}

interface SearchResponse {
    Search: Movie[];
    totalResults: string;
    imdbID?: string;
}

export default function MoviePage() {
    const [movieData, setMovieData] = useState<Movie[]>([]);
    const [resultCount, setResultCount] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
    const router = useRouter();
    
    const handleImageError = (imdbID: string) => {
        setFailedImages(prev => new Set(prev).add(imdbID));
    };
    
    const updateMovieData = (data: SearchResponse) => {
        setIsLoading(true);
        // Handle both search results (array) and single movie results
        if (data.Search && Array.isArray(data.Search)) {
            // Remove duplicates based on imdbID
            const uniqueMovies = data.Search.filter((movie: Movie, index: number, self: Movie[]) => 
                index === self.findIndex((m: Movie) => m.imdbID === movie.imdbID)
            );
            setMovieData(uniqueMovies);
            setResultCount(data.totalResults);
        } else if (data.imdbID) {
            // Single movie result, convert to array
            setMovieData([data as unknown as Movie]);
        }
        // Set loading to false after data is processed
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    };
    
    useEffect(() => {
        // Retrieve movie data from sessionStorage on mount
        setTimeout(() => {
            const storedData = sessionStorage.getItem(`movie_data`);
            if (storedData) {
                const data = JSON.parse(storedData);
                updateMovieData(data);
            } else {
                setIsLoading(false);
            }
        }, 500); // 500ms delay to simulate loading time
        
        // Listen for custom event when new search data is available
        const handleMovieDataUpdate = (event: Event) => {
            if (event instanceof CustomEvent) {
                updateMovieData(event.detail as SearchResponse);
            }
        };

        window.addEventListener("movieDataUpdated", handleMovieDataUpdate as EventListener);
        
        return () => {
            window.removeEventListener("movieDataUpdated", handleMovieDataUpdate as EventListener);
        };
    }, []);

    return (
        <AppLayout>
            <div className="p-4">
                <Text as="h1" className="text-3xl font-bold text-center mb-4">Search Results ({isLoading || !resultCount ? <span className="inline-flex"><Loader /></span> : resultCount})</Text>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {/* Additional movie details can be added here */}
                    {isLoading || movieData.length === 0 ? (
                        <div className="flex items-center justify-center gap-2 col-span-full min-h-[60vh]">
                            <Text as="h1">Loading </Text>
                            <span className="inline-flex mt-6"><Loader size="lg" /></span>
                        </div>
                    ) : (
                        movieData.slice(0, 9).map((movie: Movie) => (
                            <div key={movie.imdbID} className="h-full">
                                <Card className="h-full flex flex-col shadow-none hover:shadow-md">
                                    <Card.Content className="p-0">
                                        {failedImages.has(movie.imdbID) ? (
                                            <div className="w-full h-[500px] bg-gray-300 flex items-center justify-center rounded-t">
                                                <Text as="p" className="text-gray-600">Image Not Found</Text>
                                            </div>
                                        ) : (
                                            <img 
                                                src={movie.Poster} 
                                                alt={movie.Title} 
                                                className="w-full h-[500px] object-cover rounded-t" 
                                                onError={() => handleImageError(movie.imdbID)}
                                            />
                                        )}
                                    </Card.Content>
                                    <Card.Header className="min-h-16 flex flex-col grow">
                                        <Card.Title className="text-pretty">
                                            {movie.Title}
                                        </Card.Title>
                                    </Card.Header>
                                    <Card.Content className="flex flex-col grow min-h-[120px]">
                                        <div className="grid grid-cols-2 gap-2 items-center">
                                            <Text as="p">Year: {movie.Year} </Text>
                                            <Text as="p">Type: {movie.Type} </Text>
                                        </div>
                                        <Button className="mt-auto self-end" onClick={() => router.push(`/movie/${movie.imdbID}`)}>View Details</Button>
                                    </Card.Content>
                                </Card>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AppLayout>
    );
}