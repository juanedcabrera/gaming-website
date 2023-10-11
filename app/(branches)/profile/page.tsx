'use client';
import React, { useState, useEffect } from 'react';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ProfileForm } from '@/app/components/ProfileForm/page';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Separator } from '@/components/ui/separator';

interface Game {
  userId: number;
  _id: string;
  title: string;
  userName: string;
  category: string;
  description: string;
  image: string;
  likes: number[];
  comments: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const Profile = () => {
  const [bio, setBio] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');
  const [games, setGames] = useState<Game[]>([]);
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
  const token = localStorage.getItem('token');
  const decodedToken = jwt.decode(token as string);
  const [fetchedLikes, setFetchedLikes] = useState<number>(0);

  useEffect(() => {
    const userId = decodedToken ? (decodedToken as any).id : null;

    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/api-v1/users/profile/${userId}`,
          {
            headers: {
              Authorization: token as string,
            },
          }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const data = await response.json();
        setBio(data.user.bio);
        setAvatar(data.user.avatar);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  });

  useEffect(() => {
    if (!token || typeof decodedToken !== 'object') {
      console.error('Token not found or invalid.');
      // Handle error scenario, such as redirecting to the login page
      return;
    }

    const fetchUserGames = async () => {
      try {
        // Make an API request to fetch random games data
        const response = await fetch(`${apiUrl}/api-v1/game/all`);
        if (!response.ok) {
          throw new Error('Failed to fetch random games');
        }
        const data = await response.json();
        setGames(data.games);
      } catch (error) {
        console.error('Error fetching user games:', error);
      }
    };
    // This will fetch all the games and then filter by the userId from the jwt.
    fetchUserGames();
  }, [decodedToken, setGames, token]);

  const userId = decodedToken ? (decodedToken as any).id : null;

  // This will filter the games by the userId
  const userGames = games.filter((game) => game.userId === userId);

  const deleteGame = async (gameId: string) => {
    try {
      const response = await fetch(`${apiUrl}/api-v1/game/${gameId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token as string,
        },
      });
    } catch (error) {
      console.error('Error deleting game:', error);
    }
  };

  return (
    <>
      {token ? (
        <div className="p-6 bg-gray-800 grid md:grid-cols-5">
          <div className="col-span-1"></div>
          <div className="col-span-3">
            <h2 className="text-2xl font-semibold mb-4 md:text-3xl md:mb-6 text-white">
              Hi{' '}
              {decodedToken && typeof decodedToken === 'object'
                ? decodedToken.name
                : ''}
              , welcome back !
            </h2>
            <img
              src={avatar}
              alt="avatar"
              className="w-32 h-32 object-cover mb-4 md:mb-6 rounded-full"
            />
            {/* show bio */}
            <p className="text-base md:text-lg mb-4 md:mb-6 text-white">
              {bio}
            </p>
            <Separator className="mb-2" />
            <ProfileForm />
            <div>
              <h2 className="text-2xl font-semibold mb-4 md:text-3xl md:mb-6 pt-9 text-white">
                Your Games
              </h2>
              <Button
                variant="secondary"
                className="py-2 px-4 mb-4 md:mb-6"
                onClick={() => (window.location.href = 'profile/upload')}
              >
                Upload a Game
              </Button>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {userGames.length > 0 ? (
                  userGames.map((game) => (
                    <Card key={game._id} className='flex flex-col'>
                      <CardHeader>
                        <CardTitle className="text-3xl md:text-5xl font-semibold mb-4">
                          {game.title}
                        </CardTitle>
                        <CardDescription>
                          <img
                            src={game.image}
                            alt={game.title}
                            className="w-full h-48 object-cover mb-4 md:mb-6 rounded-lg"
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
                      <CardFooter className="flex justify-between mt-auto">
                        <div className="space-x-2">
                          <Button
                            className=""
                            variant="default"
                            onClick={() =>
                              (window.location.href = `/profile/games/edit/${game._id}`)
                            }
                          >
                            <FaEdit />
                          </Button>
                        </div>
                        <div>
                          <p className="text-base md:text-lg">
                            Likes:{' '}
                            {Array.isArray(game.likes) ? game.likes.length : 0}
                          </p>
                        </div>
                        {/* <div className="flex-grow">
                          <Button
                            className="w-full md:w-auto"
                            variant="default"
                            onClick={() =>
                              (window.location.href = `/profile/blog/${game._id}`)
                            }
                          >
                            Blog Posts
                          </Button>
                        </div> */}
                        <div className="space-x-2">
                          <Button
                            className=""
                            variant="destructive"
                            onClick={() => deleteGame(game._id)}
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="text-gray-600">No games found.</div>
                )}
              </div>
            </div>
          </div>
          <div className="col-span-1"></div>
        </div>
      ) : (
        <div className="p-6 bg-gray-800"></div>
      )}
    </>
  );
};

export default Profile;
