import React, { useState, useEffect } from 'react';
import '../../../styles/tailwind.css';

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

interface HeroSectionProps {
  objectIDs: string[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ objectIDs }) => {
  const [heroGame, setHeroGame] = useState<HeroGame | null>(null);

  const fetchHeroGame = async () => {
    try {
      const objectID = objectIDs[0]; // Assuming only the first objectID is used

      // Make an API request to fetch the hero game data based on the provided objectID
      const response = await fetch(`http://localhost:8000/api-v1/game/${objectID}`);
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
  }, [objectIDs]);

  return (
    <div className="flex flex-col items-center">
      {heroGame ? (
        <div className="flex flex-col items-center space-y-6 md:flex-row md:space-y-0 md:space-x-8">
          <img className="w-3/4 md:w-1/2 rounded-lg" src={heroGame.image} alt={heroGame.title} />
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{heroGame.title}</h1>
            <p className="text-base md:text-lg">By: {heroGame.userName}</p>
            <p className="text-base md:text-lg">Category: {heroGame.category}</p>
            <p className="text-base md:text-lg">Tech Stack: {heroGame.techstack}</p>
            <p className="text-base md:text-lg">Github: {heroGame.github}</p>
            <p className="text-base md:text-lg">Deployment: {heroGame.link}</p>
            <p className="text-base md:text-lg">Description: {heroGame.description}</p>
          </div>
        </div>
      ) : (
        <p>No hero game found.</p>
      )}
    </div>
  );
};

export default HeroSection;
