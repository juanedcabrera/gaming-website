'use client';
import { useEffect, useState } from 'react';

interface Game {
  _id: string;
  title: string;
  userName: string;
  category: string;
  description: string;
  image: string;
  likes: number;
  comments: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

export default function Search({ params }: { params: { search: string } }) {
  const [search, setSearch] = useState('');
  const [games, setGames] = useState<Game[]>([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function searchGames() {
      try {
        const response = await fetch(
          `${apiUrl}/api-v1/game/search/${params.search}`
        );
        if (!response.ok) {
          throw new Error(`Failed to search for game: ${params.search}`);
        }
        const data = await response.json();
        setGames(data.games);
      } catch (error) {
        console.error('Error searching for game:', error);
      }
    }
    searchGames();
  }, []);

  const decodedSearch = decodeURIComponent(params.search);

  return (
    <div className="text-slate-300 bg-gray-800 py-9">
      <h1 className="text-2xl font-bold mb-4 md:text-3xl md:mb-6 text-center">
        Search Results: {decodedSearch}
      </h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {games.length > 0 ? (
          games.map((game, index) => (
            <a key={index} href={`/games/${game._id}`} className="block">
              <div className="p-4 text-slate-300 bg-gray-700 rounded-lg">
                <img
                  src={game.image}
                  alt={game.title}
                  className="object-cover w-full h-64 md:h-80 lg:h-96 rounded-lg"
                />
                <p className="text-lg font-bold mb-2 md:text-xl">
                  {game.title}
                </p>
                <p className="text-sm text-slate-300 mb-2 md:text-base">
                  Category: {game.category}
                </p>
              </div>
            </a>
          ))
        ) : (
          <div className="text-red-500">No games found.</div>
        )}
      </div>
    </div>
  );
}
