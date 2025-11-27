"use client";

import AppLayout from "@/components/layout/app-layout";
import { useEffect, useState, use } from "react";
import { getMovieDetails } from "@/lib/api/searchMovie";
import { movieDetailsQuery, movieDetailsResponse } from "@/types/movie.types";
import { Card } from "@/components/retroui/Card";
import { Text } from "@/components/retroui/Text";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { Button } from "@/components/retroui/Button";

export default function MovieDetails({ params }: { params: Promise<{ movieId: string }> }) {
    const { movieId } = use(params) as { movieId: string };
    const [movieData, setMovieData] = useState<movieDetailsResponse | null>(null);
    const [imageError, setImageError] = useState<boolean>(false);
    const router = useRouter();

    const handleImageError = () => {
        setImageError(true);
    };

    useEffect(() => {
        let isMounted = true;
        const timeoutId = setTimeout(() => {
            const fetchMovieDetails = async () => {
                try {
                    const movieDetailsQuery: movieDetailsQuery = { i: movieId };
                    const result: movieDetailsResponse = await getMovieDetails(movieDetailsQuery);
                    if (!isMounted) return;
                    if (result.Response === "True") {
                        setMovieData(result as unknown as movieDetailsResponse);
                    } else {
                        router.push("/error/not_found");
                    }
                } catch (err) {
                    if (!isMounted) return;
                    router.push("/error/not_found");
                }
            };
            fetchMovieDetails();
        }, 500);

        return () => {
            isMounted = false;
            clearTimeout(timeoutId);
        };
    }, [movieId, router]);

    return (
        <AppLayout>
            <div className="p-4">
                <div className="flex justify-between items-start">
                    <div className="mt-2">
                         <Text as="h1" className="text-3xl font-bold mb-4">{movieData ? movieData.Title : <Skeleton className="w-1/3 h-8" />}</Text>
                    </div>
                    <div className="basic w-55 justify-items-center p-4">
                        <Button onClick={() => router.back()} className="mb-4">Go Back</Button>
                    </div>
                </div>
                {movieData && movieData.Title ? (
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
                        <Card>
                            <Card.Content>
                                {imageError ? (
                                    <div className="w-full h-[500px] bg-gray-300 flex items-center justify-center rounded-t">
                                        <Text as="p" className="text-gray-600">Image Not Found</Text>
                                    </div>
                                ) : (
                                    <img
                                        src={movieData.Poster}
                                        alt={movieData.Title}
                                        className="w-full h-[500px] object-cover rounded-t"
                                        onError={handleImageError}
                                    />
                                )}
                                <div className="mt-4 flex flex-col gap-2">
                                    <Text as="h3">Ratings:</Text>
                                    <div className="flex flex-col gap-2">
                                        {movieData.Ratings.map((rating: { Source: string; Value: string }) => (
                                            <Text as="p" key={rating.Source}>{rating.Source}: {rating.Value}</Text>
                                        ))}
                                    </div>
                                    <Text as="p" key={movieData.imdbRating}>IMDB Rating: {movieData.imdbRating}</Text>
                                    <Text as="p" key={movieData.imdbVotes}>IMDB Votes: {movieData.imdbVotes}</Text>
                                    <Text as="p" key={movieData.Metascore}>Metascore: {movieData.Metascore}</Text>
                                </div>
                            </Card.Content>
                        </Card>
                        <div className="mt-4">
                            <Text as="p" className="mb-2"><strong>Year:</strong> {movieData.Year}</Text>
                            <Text as="p" className="mb-2"><strong>Genre:</strong> {movieData.Genre}</Text>
                            <Text as="p" className="mb-2"><strong>Director:</strong> {movieData.Director}</Text>
                            <Text as="p" className="mb-2"><strong>Writer:</strong> {movieData.Writer}</Text>
                            <Text as="p" className="mb-2"><strong>Actors:</strong> {movieData.Actors}</Text>
                            <Text as="p" className="mb-2"><strong>Released:</strong> {movieData.Released}</Text>
                            <Text as="p" className="mb-2"><strong>Runtime:</strong> {movieData.Runtime}</Text>
                            <Text as="p" className="mb-2"><strong>Rated:</strong> {movieData.Rated}</Text>
                            <Text as="p" className="mb-2"><strong>Language:</strong> {movieData.Language}</Text>
                            <Text as="p" className="mb-2"><strong>Country:</strong> {movieData.Country}</Text>
                            <Text as="p" className="mb-2"><strong>Awards:</strong> {movieData.Awards}</Text>
                            <Text as="p" className="mb-2"><strong>Plot:</strong> {movieData.Plot}</Text>
                        </div>
                    </div>

                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
                        <Card>
                            <Card.Content>
                                <Skeleton className="w-full h-[500px]" />
                                <div className="mt-4 flex flex-col gap-2">
                                    <Skeleton className="w-full h-[40px]" />
                                    <div className="flex flex-col gap-2">
                                        <Skeleton className="w-full h-[20px]" />
                                        <Skeleton className="w-full h-[20px]" />
                                        <Skeleton className="w-full h-[20px]" />
                                        <Skeleton className="w-full h-[20px]" />
                                    </div>
                                </div>
                            </Card.Content>
                        </Card>
                        <div className="mt-4">
                            <Skeleton className="w-full h-[20px] mb-2" />
                            <Skeleton className="w-full h-[20px] mb-2" />
                            <Skeleton className="w-full h-[20px] mb-2" />
                            <Skeleton className="w-full h-[20px] mb-2" />
                            <Skeleton className="w-full h-[20px] mb-2" />
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    )
}