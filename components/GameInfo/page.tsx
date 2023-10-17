'use client';
import React, { useState, useEffect } from 'react';
import Like from '../Like/Like';

const GameComponent: React.FC = () => {
  const [game, setGame] = useState<any>(null);
  const [numberOfLikes, setNumberOfLikes] = useState<number>(0);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const fetchGame = async () => {
    try {
      // Get the game ID from the URL
      const gameID = window.location.pathname.split('/').pop();

      // Make an API request to fetch the game data
      const response = await fetch(`${apiUrl}/api-v1/game/${gameID}`);
      if (!response.ok) {
        throw new Error('Failed to fetch game');
      }

      // Parse the response data as JSON
      const data = await response.json();
      // Update the game state variable with the fetched data
      setGame(data.game);

      // const likeResponse = await fetch(
      //   `${apiUrl}/api-v1/like/${gameID}/`
      // );
      // const likeData = await likeResponse.json();
      // setNumberOfLikes(likeData.likes);
    } catch (error) {
      console.error('Error fetching game:', error);
    }
  };

  useEffect(() => {
    fetchGame();
  }, []);

  return (
    <div className="container mx-auto p-11 text-white ">
      {/* Game Header */}
      <div className="text-center mb-8 ">
        {game ? (
          <h1 className="text-4xl font-bold">{game.title}</h1>
        ) : (
          <p>Loading...</p>
        )}
        {game && (
          <p>
            By:{' '}
            <a className="underline" href={`../profile/${game.userId}`}>
              {game.userName}
            </a>
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-700 rounded-lg">
        {/* Game Image */}
        <div className="md:col-span-1 ">
          {game ? (
            <div className="w-full h-97  overflow-hidden relative rounded-l-lg">
              <img
                src={
                  game.image ||
                  'https://ucarecdn.com/5df07fe1-89d2-44b5-be91-004613f1e288/NYD.svg'
                }
                alt={game.title}
                onError={(e) => {
                  e.currentTarget.src =
                    'https://ucarecdn.com/5df07fe1-89d2-44b5-be91-004613f1e288/NYD.svg';
                }}
                className="w-full md:w-[640px] md:h-[480px] object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 flex justify-center space-x-4 p-4 bg-white bg-opacity-50 text-black">
                <Like game={game} />
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        {/* Game Details */}
        <div className="md:col-span-1 p-9">
          {game ? (
            <div>
              <div className="mb-4">
                <p className="text-xl font-bold">Category:</p>
                <p>{game.category}</p>
              </div>
              <div className="mb-4">
                <p className="text-xl font-bold">Description:</p>
                <p>{game.description}</p>
              </div>
              <div className="mb-4">
                <p className="text-xl font-bold">Link:</p>
                <a
                  className="underline"
                  href={game.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {game.link}
                </a>
              </div>
              <div className="mb-4">
                <p className="text-xl font-bold">Github:</p>
                <a
                  className="underline"
                  href={game.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {game.github}
                </a>
              </div>
              <div className="mb-4">
                <p className="text-xl font-bold">TechStack:</p>
                <p>{game.techstack}</p>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameComponent;
