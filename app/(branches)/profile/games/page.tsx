'use client'
import React from 'react';
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';


// List of games that the user has uploaded
// This page will be a list of games that the user has uploaded
// Under each game will be a link to edit the game
interface Game {
  userId: number;
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

const UserGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const apiUrl = process.env.REACT_APP_API_URL
  // This will fetch all the games and then filter by the userId from the jwt. 
  const fetchUserGames = async () => {
    try {
      // Make an API request to fetch random games data
      const response = await fetch(`${apiUrl}/api-v1/game/all`);
      if (!response.ok) {
        throw new Error('Failed to fetch random games');
      }
      const data = await response.json();
      setGames(data.games)

    } catch (error) {
      console.error('Error fetching user games:', error);
    }
  };

  const token =
  typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const decodedToken = token ? jwt.decode(token) : null;
  const userId = decodedToken? (decodedToken as any).id : null;

  // This will filter the games by the userId
  const userGames = games.filter(game => game.userId === userId);


  useEffect(() => {
    fetchUserGames();
  }
  , []);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 md:text-3xl md:mb-6">Only User Games</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {userGames.length > 0 ? (
          userGames.map((game) => (
            <div key={game._id} className="flex flex-col items-center space-y-6">
              <a href={`/profile/games/edit/${game._id}`} className="text-center md:text-left">
                <h3 className="text-3xl md:text-5xl font-bold mb-4">{game.title}</h3>
              </a>
              <img src={game.image} alt={game.title} className="w-24 h-24 rounded-full" />
              <p className="text-base md:text-lg">Category: {game.category}</p>
              <p className="text-base md:text-lg">Description: {game.description}</p>
            </div>
          ))
        ) : (
          <div>No games found.</div>
        )}
      </div>
    </div>
  );
  
  
  
};

export default UserGames;