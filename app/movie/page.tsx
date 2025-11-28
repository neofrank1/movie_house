"use client";

import AppLayout from "@/components/layout/app-layout";
import { useEffect, useState, useCallback, useRef } from "react";
import { Card } from "@/components/retroui/Card";
import { Button } from "@/components/retroui/Button";
import { Text } from "@/components/retroui/Text";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/retroui/Loader";
import Image from "next/image";
import { MoviePreview, SearchResponse } from "@/types/movie.types";
import { searchMoviePagination } from "@/lib/api/searchMovie";

const isValidUrl = (urlString: string): boolean => {
    try {
        new URL(urlString);
        return true;
    } catch {
        return false;
    }
};

export default function MoviePage() {
    const [movieData, setMovieData] = useState<MoviePreview[]>([]);
    const [resultCount, setResultCount] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
    const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
    const router = useRouter();
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [displayedCount, setDisplayedCount] = useState<number>(9);
    const scrollPositionRef = useRef<number>(0);
    const shouldRestoreScrollRef = useRef<boolean>(false);
    
    const handleImageError = (imdbID: string) => {
        setFailedImages(prev => new Set(prev).add(imdbID));
    };
    
    const updateMovieData = (data: SearchResponse, append: boolean = false) => {
        // Save scroll position before updating data
        if (append) {
            scrollPositionRef.current = window.pageYOffset || document.documentElement.scrollTop;
            shouldRestoreScrollRef.current = true;
        }
        
        if (!append) {
            setIsLoading(true);
        }
        // Handle both search results (array) and single movie results
        if (data.Search && Array.isArray(data.Search)) {
            // Remove duplicates based on imdbID
            const uniqueMovies = data.Search.filter((movie: MoviePreview, index: number, self: MoviePreview[]) => 
                index === self.findIndex((m: MoviePreview) => m.imdbID === movie.imdbID)
            );
            
            if (append) {
                // Append new movies to existing data, avoiding duplicates
                setMovieData(prev => {
                    const existingIds = new Set(prev.map(m => m.imdbID));
                    const newMovies = uniqueMovies.filter(m => !existingIds.has(m.imdbID));
                    return [...prev, ...newMovies];
                });
            } else {
                setMovieData(uniqueMovies);
                setDisplayedCount(9); // Reset displayed count on new search
            }
            setResultCount(data.totalResults);
            setTotalPages(Math.ceil(Number(data.totalResults) / 10));
        } else if (data.imdbID) {
            // Single movie result, convert to array
            setMovieData([data as unknown as MoviePreview]);
            setDisplayedCount(1);
            setTotalPages(1);
        }
        // Set loading to false after data is processed
        setTimeout(() => {
            setIsLoading(false);
            setIsLoadingMore(false);
        }, 500);
    };
    
    // Load more movies (next page)
    const loadMoreMovies = useCallback(async () => {
        if (isLoadingMore || page >= totalPages) return;
        
        setIsLoadingMore(true);
        const nextPage = page + 1;
        const searchTitle = sessionStorage.getItem(`search_title`);
        
        if (searchTitle) {
            try {
                const searchMovieQuery = { s: searchTitle };
                const result = await searchMoviePagination(searchMovieQuery, nextPage);
                updateMovieData(result, true); // Append mode
                setPage(nextPage);
                // displayedCount will be updated by scroll handler when new data is available
            } catch (error) {
                console.error("Error loading more movies:", error);
                setIsLoadingMore(false);
            }
        } else {
            setIsLoadingMore(false);
        }
    }, [page, totalPages, isLoadingMore]);
    
    // Scroll event handler
    const handleScroll = useCallback(() => {
        if (isLoadingMore || isLoading) return;
        
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollBottom = documentHeight - (scrollTop + windowHeight);
        
        // Trigger when user is within 200px of bottom
        if (scrollBottom < 700 && displayedCount < movieData.length) {
            // Save scroll position before showing more items
            scrollPositionRef.current = scrollTop;
            shouldRestoreScrollRef.current = true;
            // Show 9 more items from existing data
            setDisplayedCount(prev => Math.min(prev + 9, movieData.length));
        } else if (scrollBottom < 700 && page < totalPages && displayedCount >= movieData.length) {
            // Load next page if we've shown all current data
            loadMoreMovies();
        }
    }, [isLoadingMore, isLoading, displayedCount, movieData.length, page, totalPages, loadMoreMovies]);

    useEffect(() => {
        // Retrieve movie data from sessionStorage on mount
        setTimeout(() => {
            const storedData = sessionStorage.getItem(`movie_data`);
            if (storedData) {
                const data = JSON.parse(storedData);
                setDisplayedCount(9); // Ensure displayedCount is 9 on initial load
                updateMovieData(data);
            } else {
                router.push("/error/not_found");
            }
        }, 500); // 500ms delay to simulate loading time
        
        // Listen for custom event when new search data is available
        const handleMovieDataUpdate = (event: Event) => {
            if (event instanceof CustomEvent) {
                setDisplayedCount(9); // Reset displayedCount to 9 for new search
                updateMovieData(event.detail as unknown as SearchResponse);
            }
        };

        window.addEventListener("movieDataUpdated", handleMovieDataUpdate as EventListener);
        
        return () => {
            window.removeEventListener("movieDataUpdated", handleMovieDataUpdate as EventListener);
        };
    }, []);

    // Scroll event listener
    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]);

    // Restore scroll position after data loads
    useEffect(() => {
        if (shouldRestoreScrollRef.current && !isLoading && !isLoadingMore) {
            // Use requestAnimationFrame to ensure DOM has updated
            requestAnimationFrame(() => {
                window.scrollTo(0, scrollPositionRef.current);
                shouldRestoreScrollRef.current = false;
            });
        }
    }, [movieData, displayedCount, isLoading, isLoadingMore]);

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
                        movieData.slice(0, displayedCount).map((movie: MoviePreview) => (
                            <div key={movie.imdbID} className="h-full">
                                <Card className="h-full flex flex-col shadow-none hover:shadow-md">
                                    <Card.Content className="p-0">
                                        {failedImages.has(movie.imdbID) || !movie.Poster || movie.Poster === "N/A" || !isValidUrl(movie.Poster) ? (
                                            <div className="w-full h-[500px] bg-gray-300 flex items-center justify-center rounded-t">
                                                <Text as="p" className="text-gray-600">Image Not Found</Text>
                                            </div>
                                        ) : (
                                            <Image 
                                                src={movie.Poster} 
                                                alt={movie.Title} 
                                                width={300}
                                                height={500}
                                                className="object-cover rounded-t w-full h-[500px]" 
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
                    {isLoadingMore && (
                        <div className="flex items-center justify-center gap-2 col-span-full py-8">
                            <Text as="p">Loading more movies...</Text>
                            <span className="inline-flex"><Loader /></span>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}