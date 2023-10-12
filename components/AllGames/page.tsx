'use client'
import React, { useState, useEffect } from 'react';

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

const AllGames: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  const fetchRandomGames = async () => {
    try {
      // Make an API request to fetch random games data
      const response = await fetch(`${apiUrl}/api-v1/game/all`);
      if (!response.ok) {
        throw new Error('Failed to fetch random games');
      }

      // Parse the response data as JSON
      const data = await response.json();
      // Update the games state variable with the fetched data
      setGames(data.games)
    } catch (error) {
      console.error('Error fetching random games:', error);
    }
  };

  useEffect(() => {
    fetchRandomGames();
  }
  , []);


  return (
    <div>
      <ul>
        {games.length > 0 ? (
          games.map((game) => (
            <li key={game._id}>
              <a href={`/games/${game._id}`}>
                <h3>{game.title}</h3>
              </a>
              <img src={game.image} alt={game.title} width={50} height={50} />
              <p>Category: {game.category}</p>
              <p>Description: {game.description}</p>
              <p>By: {game.userName}</p>
            </li>
          ))
        ) : (
          <li>No games found.</li>
        )}
      </ul>
    </div>
  );
        }  

export default AllGames;
