'use client';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Profile {
  id: string;
  name: string;
  username: string;
  bio: string;
  avatar: string;
}

interface Game {
  _id: string;
  title: string;
  userName: string;
  userId: number;
  category: string;
  image: string;
  description: string;
}

export default function ProfileView({ params }: { params: { id: string } }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchProfile = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/api-v1/users/profile/${params.id}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
      const data = await response.json();
      setProfile(data.user);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchGames = async () => {
    try {
      const response = await fetch(`${apiUrl}/api-v1/game/user/${params.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch games');
      }
      const data = await response.json();
      setGames(data.games);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchGames();
  }, []);

  return (
    <div className="p-6 bg-gray-800 text-white min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-3xl font-semibold mb-4">Profile View</h1>
        {profile ? (
          <>
            <div className="flex items-center space-x-4">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="rounded-full w-16 h-16 md:w-24 md:h-28 lg:w-32 lg:h-36 xl:w-40 xl:h-44"
              />

              <div>
                <h1 className="text-3xl font-semibold mb-2">{profile.name}</h1>
                <p className="text-gray-400">{profile.username}</p>
                <p className="text-lg mt-2">{profile.bio}</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mt-4 md:text-3xl md:mb-6">
                Games
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {games.length > 0 ? (
                  games.map((game) => (
                    <a href={`/games/${game._id}`} key={game._id}>
                      <Card key={game._id}>
                        <CardHeader>
                          <CardTitle className="text-3xl md:text-5xl font-semibold mb-2">
                            {game.title}
                          </CardTitle>
                          <CardDescription>
                            <img
                              src={game.image}
                              alt={game.title}
                              className="w-full h-48 object-cover mb-2 md:mb-4 rounded-lg"
                            />
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-base md:text-lg">
                            Category: {game.category}
                          </p>
                          <p className="text-base md:text-lg">
                            Description: {game.description}
                          </p>
                        </CardContent>
                      </Card>
                    </a>
                  ))
                ) : (
                  <div className="text-gray-600">No games found.</div>
                )}
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
