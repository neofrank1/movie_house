'use client';

import AppLayout from "@/components/layout/app-layout";
import { Text } from "@/components/retroui/Text";
import { Card } from "@/components/retroui/Card";
import Image from "next/image";

export default function Home() {
  return (
    <AppLayout>
      <div className="mt-10 p-4 col-span-full min-h-[20vh]">
        <Text as="h1" className="text-3xl font-bold text-center mb-4">Welcome to the Movie House 🍿</Text>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="col-span-1">
            <Text as="p" className="text-justify text-lg">
              This is a simple movie search engine built with Next.js and Tailwind CSS. 
              You can search for a movie by title and get the details of the movie. 
              You can also get the details of a movie by its ID.
            </Text>
            <Text as="p" className="text-justify mt-4 text-lg">
              Explore a vast collection of movies, discover new releases, and find detailed information 
              about your favorite films. Our platform provides an intuitive interface to search and 
              browse movie and TV series information effortlessly.
            </Text>
          </div>
          <div className="col-span-1 flex justify-center items-center">
            <Card className="p-4 w-full lg:max-w-xl md:max-w-lg shadow-md hover:shadow-md">
              <Card.Content>
                <Card.Title>Movie and TV Series Search</Card.Title>
                <Card.Description>
                  Search for your favorite movies and TV series and discover new ones!
                </Card.Description>
              </Card.Content>
            </Card>
          </div>
        </div>
        <div>
          <Text as="h2" className="text-2xl font-bold text-center mb-4 mt-10">🍿 Featured Movies 🍿</Text>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <Card.Content>
                <Image src="https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_SX300.jpg" alt="" width={300} height={450} className="h-[450px]"/>
                <Card.Title className="text-center text-pretty mt-2">The Shawshank Redemption</Card.Title>
              </Card.Content>
            </Card>
            <Card>
              <Card.Content>
                <Image src="https://m.media-amazon.com/images/M/MV5BZTA3OWVjOWItNjE1NS00NzZiLWE1MjgtZDZhMWI1ZTlkNzYwXkEyXkFqcGc@._V1_SX300.jpg" alt="" width={300} height={450} className="h-[450px]"/>
                <Card.Title className="text-center text-pretty mt-2">Toy Story</Card.Title>
              </Card.Content>
            </Card>
            <Card>
              <Card.Content>
                <Image src="https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg" alt="" width={300} height={450} className="h-[450px]"/>
                <Card.Title className="text-center text-pretty mt-2">Avengers: Endgame</Card.Title>
              </Card.Content>
            </Card>
            <Card>
              <Card.Content>
                <Image src="https://m.media-amazon.com/images/M/MV5BZmM3ZjE0NzctNjBiOC00MDZmLTgzMTUtNGVlOWFlOTNiZDJiXkEyXkFqcGc@._V1_SX300.jpg" alt="" width={300} height={450} className="h-[450px]"/>
                <Card.Title className="text-center text-pretty mt-2">Back to the Future</Card.Title>
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}