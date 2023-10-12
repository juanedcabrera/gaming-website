'use client'
import CategoryGames from '../../components/CategoryGames/page';
import { SetStateAction, useState } from 'react';

const Games = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const availableCategories = [
    'Action',
    'Adventure',
    'Strategy',
    'RPG',
    'Puzzle',
    'Simulation',
    'Sports',
    'Racing',
    'CardandBoard',
    'Casual',
    'MMO',
    'Arcade',
  ];

  const handleCategoryChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div>
      <form>
        <select onChange={handleCategoryChange} value={selectedCategory}>
        <option value="">Select a Category</option>
          {availableCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </form>
      {/* Conditionally render CategoryGames components */}
      {selectedCategory ? 
      <CategoryGames key={selectedCategory} category={selectedCategory} />
      : 
      <div>  {availableCategories.map((category) => (
        <CategoryGames key={category} category={category} />
      ))}</div>}
    </div>
  );
};

export default Games;
