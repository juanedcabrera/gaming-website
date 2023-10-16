
import React, { useState, useEffect } from 'react';
import '../../styles/tailwind.css';

interface HeroGame {
  _id: string;
  title: string;
  image: string;
  description: string;
  userName: string;
  category: string;
  techstack: string;
  github: string;
  link: string;
  likes: number;
  comments: number;
  views: number;
}



const HeroSection: React.FC = () => {
  const [heroGame, setHeroGame] = useState<HeroGame | null>(null);
  const apiUrl = process.env.REACT_APP_API_URL
  const fetchHeroGame = async () => {
    try {
      // This is the objectID of the game we want to feature in the hero section
      const objectID = '648ef4e763c484e397d5dfa3'

      // Make an API request to fetch the hero game data based on the provided objectID
      const response = await fetch(`${apiUrl}/api-v1/game/${objectID}`);
      if (!response.ok) {
        throw new Error('Failed to fetch hero game');
      }

      // Parse the response data as JSON
      const data = await response.json();
      // Update the hero game state variable with the fetched data
      setHeroGame(data.game);
    } catch (error) {
      console.error('Error fetching hero game:', error);
    }
  };

  useEffect(() => {
    fetchHeroGame();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
  {heroGame ? (
    <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8">
      <a href={`/games/${heroGame._id}`} className="flex justify-center">
        <img
          className="w-3/4 md:w-1/2 rounded-lg"
          src={heroGame.image}
          alt={heroGame.title}
        />
        <div className="text-center md:text-left pl-9">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 hover:underline">
            {heroGame.title}
          </h1>
          <p className="text-base md:text-lg">By: {heroGame.userName}</p>
          <p className="text-base md:text-lg">Category: {heroGame.category}</p>
          <p className="text-base md:text-lg">Tech Stack: {heroGame.techstack}</p>
          <p className="text-base md:text-lg">Github: {heroGame.github}</p>
          <p className="text-base md:text-lg">Deployment: {heroGame.link}</p>
          <p className="text-base md:text-lg">Description: {heroGame.description}</p>
        </div>
      </a>
    </div>
  ) : (
    <p>No hero game found.</p>
  )}
</div>

  
  );
};

export default HeroSection;
