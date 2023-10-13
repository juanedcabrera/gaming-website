import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSwipeable } from 'react-swipeable';

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

const Random: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPageDesktop = 3;
  const gamesPerPageMobile = 2;
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  const fetchRandomGames = async () => {
    try {
      // Make an API request to fetch random games data
      const response = await fetch(`${apiUrl}/api-v1/game/random`);
      if (!response.ok) {
        throw new Error('Failed to fetch random games');
      }

      // Parse the response data as JSON
      const data = await response.json();
      // Update the games state variable with the fetched data
      setGames(data);
    } catch (error) {
      console.error('Error fetching random games:', error);
    }
  };

  useEffect(() => {
    fetchRandomGames();
  }, []);


  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const previousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [games]);

  const canGoPrevious = currentPage > 1;



  const handleSwipeLeft = () => {
    if (currentPage < lastPage) {
      nextPage();
    }
  };

  const handleSwipeRight = () => {
    if (currentPage > 1) {
      previousPage();
    }
  };
  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
  });
  const lastPage = Math.ceil(games.length / (gamesPerPageDesktop));

  return (
    <div className="max-w-screen-xl mx-auto">
      <h2 className="flex text-3xl font-bold mb-4 justify-center">Random Games</h2>
      <div className="flex overflow-x-auto" {...swipeHandlers}>
        {games.length > 0 ? (
          games.map((game, index) => {
            const isMobile = window.innerWidth <= 768;
            const gamesPerPage = isMobile ? gamesPerPageMobile : gamesPerPageDesktop;
            if (
              index >= (currentPage - 1) * gamesPerPage &&
              index < currentPage * gamesPerPage
            ) {
              return (
                <div
                  key={game._id}
                  className={`flex-shrink-1 w-full ${
                    isMobile ? 'md:w-1/2' : 'md:w-1/3'
                  } bg-gray-900 rounded-lg shadow-lg p-1 mx-2`}
                >
                  <Link href={`/games/${game._id}`} passHref>
                  
                      <img
                        src={game.image || 'https://ucarecdn.com/5df07fe1-89d2-44b5-be91-004613f1e288/'}
                        alt={game.title}
                        onError={(e) => {
                          e.currentTarget.src = 'https://ucarecdn.com/5df07fe1-89d2-44b5-be91-004613f1e288/';
                        }}
                        className="w-full h-64 object-cover rounded-t-lg"
                      />
                      <div className="p-4">
                        <h3 className="text-xl lg:text-2xl font-bold mb-2">
                          {game.title}
                        </h3>
                        <p className="text-base lg:text-lg mb-2">
                          By: {game.userName}
                        </p>
                        <p className="text-base lg:text-lg mb-2">
                          Category: {game.category}
                        </p>
                        <p className="text-base lg:text-lg">
                          Description: {game.description}
                        </p>
                      </div>
                   
                  </Link>
                </div>
              );
            }
            return null;
          })
        ) : (
          <p>No games found.</p>
        )}
      </div>
      <div className="flex justify-center mt-3">
        {canGoPrevious && (
          <button
            onClick={previousPage}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md mr-2"
          >
            Previous
          </button>
        )}
        {currentPage < lastPage && (
          <button
            onClick={nextPage}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Random;
