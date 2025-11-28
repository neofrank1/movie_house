"use client";

import { Input } from "@/components/retroui/Input";
import { Button } from "@/components/retroui/Button";
import Link from "next/link";
import searchMovie from "@/lib/api/searchMovie";
import { FormEvent, KeyboardEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function AppHeader() {
    const router = useRouter();
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (showAlert) {
            toast("Please enter a movie title to search");
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const searchTitle = formData.get("searchTitle") as string || "";
        
        if (!searchTitle.trim()) {
            setShowAlert(true);
            return;
        }
        
        const searchMovieQuery = { s: searchTitle };
        const result = await searchMovie(searchMovieQuery);
        if (result.Response === "True") {
            // Store search title in sessionStorage
            if (sessionStorage.getItem(`search_title`)) {
                sessionStorage.removeItem(`search_title`); // Reset the session storage to avoid duplicate data
            }
            sessionStorage.setItem(`search_title`, searchTitle);

            // Store result in sessionStorage to pass to movie page
            if (sessionStorage.getItem(`movie_data`)) {
                sessionStorage.removeItem(`movie_data`); // Reset the session storage to avoid duplicate data
            }
            sessionStorage.setItem(`movie_data`, JSON.stringify(result));
            
            // Dispatch custom event to notify movie page of new data
            if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("movieDataUpdated", { detail: result }));
            }
            
            // Only navigate if not already on movie page
            if (window.location.pathname !== "/movie") {
                router.push(`/movie`);
            }
        } else {
            router.push("/error/not_found");
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const form = e.currentTarget.closest("form");
            if (form) {
                form.requestSubmit();
            }
        }
    };
    
    return (
        <header>
            <nav className="px-4 py-2 border-b-3 bg-primary text-black">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-lg gap-4">
                    <Link href="/" className="text-2xl font-bold">Movie House</Link>
                    <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
                        <div className="flex flex-col gap-2 w-full">
                            <div className="flex justify-end items-center gap-2 w-full">
                                <Input name="searchTitle" placeholder="Search for a movie" className="w-full max-w-md mx-1 my-1 bg-white" onKeyDown={handleKeyDown} onChange={() => setShowAlert(false)} />
                                <Button variant="secondary" className="shadow-lg shadow-white hover:shadow-md" type="submit">Search</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </nav>
        </header>
    );
}