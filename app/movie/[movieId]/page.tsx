import AppLayout from "@/components/layout/app-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Movie Details",
    description: "Detailed information about the selected movie",
};

export default function MovieDetails() { 
    return (
        <div>
            <AppLayout>
                <div className="p-4">
                    <h1 className="text-3xl font-bold mb-4">Movie Title</h1>
                    <p className="mb-2">This is where the detailed information about the movie will be displayed.</p>
                    {/* Additional movie details can be added here */}
                </div>
            </AppLayout>
        </div>
    )
}